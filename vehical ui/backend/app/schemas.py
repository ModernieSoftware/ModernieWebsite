from typing import Optional
from pydantic import BaseModel

# Create schema
class VehicleCreate(BaseModel):
    make: str
    model: str
    transmission: str
    fuel_type: str

    engine_cc: int
    year:int
    vehicle_price:int
    
   


    class Config:
        orm_mode = True

# Update schema (all fields optional)
class VehicleUpdate(BaseModel):
    make: Optional[str]
    model: Optional[str]
    transmission: Optional[str]
    fuel_type: Optional[str]
    engine_cc: Optional[int]
    year:int
    vehicle_price:int
    
  

class VehicleOut(BaseModel):
    id: int
    make: str
    model: str
    transmission: str
    fuel_type: str
    engine_cc: Optional[int] = 0  # Default to 0 if None
    year: int
    vehicle_price: int
    
    

    class Config:
        orm_mode = True


class ModelMapCreate(BaseModel):
    make: str
    model: str
    map_model_name: str

class ModelMapOut(BaseModel):
    id: int
    make: str
    model: str
    map_model_name: str

class ModelMap(BaseModel):
    id: int
    make: str
    model: str
    map_model_name: str


class ModelMapUpdate(BaseModel):
    make: Optional[str]
    model: Optional[str]
    map_model_name: Optional[str]