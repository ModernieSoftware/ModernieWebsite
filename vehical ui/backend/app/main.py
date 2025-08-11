import csv
from importlib import metadata
from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine, SessionLocal
from app.schemas import ModelMapCreate, VehicleCreate, VehicleUpdate, VehicleOut, ModelMapOut, ModelMapUpdate
from app.models import Vehicle, ModelMap
from app import crud
from fastapi import FastAPI, UploadFile, File
from sqlalchemy import create_engine, Table, Column, Integer, String, MetaData, text
import pandas as pd
import io

from app.models import Vehicle

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

sql_metadata= MetaData()
origins = [
    "http://localhost:5173"
]

# Add CORSMiddleware to your FastAPI app
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow only these origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

@app.post("/upload_csv")
async def upload_csv(file: UploadFile = File(...), db: Session = Depends(get_db)):
    try:
        content = await file.read()
        df = pd.read_csv(io.StringIO(content.decode("utf-8")))

        # Validate expected columns
        expected = ['make', 'model', 'transmission', 'fuel_type', 'engine_cc', 'year', 'vehicle_price']
        if not all(col in df.columns for col in expected):
            return {"error": "CSV is missing required columns."}

        # Convert DataFrame to list of Vehicle instances and sanitize invalid engine_cc values
        vehicles = [
            Vehicle(
                make=row['make'],
                model=row['model'],
                transmission=row['transmission'],
                fuel_type=row['fuel_type'],
                engine_cc=int(row['engine_cc']) if row['engine_cc'].isdigit() else 0,  # Only accept valid integers
                year=int(row['year']),
                vehicle_price=int(row['vehicle_price'])
            )
            for _, row in df.iterrows()
        ]

        # Clear existing records (optional)
        db.query(Vehicle).delete()

        # Bulk insert
        db.add_all(vehicles)
        db.commit()

        return {"message": f"{len(vehicles)} vehicles uploaded successfully."}

    except Exception as e:
        return {"error": str(e)}


#display all vehicles
@app.get("/api/vehicles")   
def read_data(db: Session = Depends(get_db)):
    try:
        vehicles = db.query(Vehicle).all()
        return vehicles
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    
# CRUD operations for Vehicle
# Create
@app.post("/vehicles/", response_model=VehicleOut)
def create_vehicle(vehicle: VehicleCreate, db: Session = Depends(get_db)):
    try:
        # Create the new vehicle object in the DB
        new_vehicle = crud.create_vehicle(db, vehicle)
        return new_vehicle
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# # Read one
# @app.get("/vehicles/{vehicle_id}", response_model=VehicleOut)
# def read_vehicle(vehicle_id: int, db: Session = Depends(get_db)):
#     vehicle = crud.get_vehicle(db, vehicle_id)
#     if not vehicle:
#         raise HTTPException(status_code=404, detail="Vehicle not found")
#     return vehicle

# Update
@app.put("/vehicles/{vehicle_id}", response_model=VehicleOut)
def update_vehicle(vehicle_id: int, updates: VehicleUpdate, db: Session = Depends(get_db)):
    updated = crud.update_vehicle(db, vehicle_id, updates)
    if not updated:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return updated

# Delete
@app.delete("/vehicles/{vehicle_id}", response_model=VehicleOut)
def delete_vehicle(vehicle_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_vehicle(db, vehicle_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return deleted


#model Map
@app.post("/upload-model-map/")
async def upload_model_map_csv(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Invalid file format. Please upload a .csv file.")

    content = await file.read()
    csv_reader = csv.DictReader(io.StringIO(content.decode()))

    saved_count = 0
    for row in csv_reader:
        try:
            model_data = ModelMapCreate(
                make=row["make"],
                model=row["model"],
                map_model_name=row["map_model_name"]
            )
            crud.create_model_map(db, model_data)
            saved_count += 1
        except Exception as e:
            print(f"Skipping row due to error: {e}")
            continue

    return {"message": f"Successfully saved {saved_count} model mappings."}


#display all Model Maps
@app.get("/api/modelmaps") 
def read_model_maps(db: Session = Depends(get_db)):
    try:
        model_maps = crud.get_model_maps(db)
        return model_maps
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 
#create model map
@app.post("/api/modelmaps", response_model=ModelMapOut)
def create_model_map(model_map: ModelMapCreate, db: Session = Depends(get_db)):
    try:
        new_model_map = crud.create_model_map(db, model_map)
        return new_model_map
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

# Update model map
@app.put("/api/modelmaps/{model_map_id}", response_model=ModelMapOut)
def update_model_map(model_map_id: int, data: ModelMapUpdate, db: Session = Depends(get_db)):
    try:
        update_model_map = crud.update_model_map(db, model_map_id, data)
        if not update_model_map:
            raise HTTPException(status_code=404, detail="Model map not found")
        return update_model_map
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    


    
#delete model map
@app.delete("/api/modelmaps/{model_map_id}", response_model=ModelMapCreate) 
def delete_model_map(model_map_id: int, db: Session = Depends(get_db)):
    deleted_model_map = crud.delete_model_map(db, model_map_id) 
    if not deleted_model_map:
        raise HTTPException(status_code=404, detail="Model map not found")
    return deleted_model_map
    for key, value in data.dict(exclude_unset=True).items():
        setattr(model_map, key, value)  
    db.commit()
    db.refresh(model_map)
    return model_map
