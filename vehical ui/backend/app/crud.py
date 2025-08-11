from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models import ModelMap, Vehicle
from app.schemas import ModelMapCreate, VehicleCreate, VehicleUpdate, VehicleOut, ModelMapOut, ModelMapUpdate

# Create
def create_vehicle(db: Session, vehicle: VehicleCreate):
    db_vehicle = Vehicle(
        make=vehicle.make,
        model=vehicle.model,
        transmission=vehicle.transmission,
        fuel_type=vehicle.fuel_type,
        engine_cc=vehicle.engine_cc,
        year=vehicle.year,
        vehicle_price=vehicle.vehicle_price,  # Ensure price is added
     
      
    )
    db.add(db_vehicle)
    db.commit()
    db.refresh(db_vehicle)
    return db_vehicle



def get_vehicle(db: Session, vehicle_id: int):
    return db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()

# Update
def update_vehicle(db: Session, vehicle_id: int, updates: VehicleUpdate):
    db_vehicle = get_vehicle(db, vehicle_id)
    if not db_vehicle:
        return None
    for key, value in updates.dict(exclude_unset=True).items():
        setattr(db_vehicle, key, value)
    db.commit()
    db.refresh(db_vehicle)
    return db_vehicle

# Delete
def delete_vehicle(db: Session, vehicle_id: int):
    db_vehicle = get_vehicle(db, vehicle_id)
    if not db_vehicle:
        return None
    db.delete(db_vehicle)
    db.commit()
    return db_vehicle


def create_model_map(db: Session, data: ModelMapCreate):
    model_map = ModelMap(**data.dict())
    db.add(model_map)
    db.commit()
    db.refresh(model_map)
    return model_map

def get_model_maps(db: Session):
    return db.query(ModelMap).all()

#create model map
def create_model_map(db: Session, model_map: ModelMapCreate):
    db_model_map = ModelMap(
        make=model_map.make,
        model=model_map.model,
        map_model_name=model_map.map_model_name
    )
    db.add(db_model_map)
    db.commit()
    db.refresh(db_model_map)
    return db_model_map



#update model map
def update_model_map(db: Session, model_map_id: int, updates: ModelMapUpdate):
    model_map = db.query(ModelMap).filter(ModelMap.id == model_map_id).first()
    if not model_map:
        return None
    
    updates_data = updates.dict(exclude_unset=True)
    for key, value in updates_data.items():
        setattr(model_map, key, value)

    db.commit()
    db.refresh(model_map)
    return model_map



def delete_model_map(db: Session, model_map_id: int):
    model_map = db.query(ModelMap).filter(ModelMap.id == model_map_id).first()
    if not model_map:
        return None
    db.delete(model_map)
    db.commit()
    return model_map

  
    