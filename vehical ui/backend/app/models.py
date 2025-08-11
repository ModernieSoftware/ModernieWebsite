import datetime
from sqlalchemy import Column, DateTime, Integer, String
from sqlmodel import BigInteger, ForeignKey
from app.database import Base

class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(Integer, primary_key=True, index=True)
    make = Column(String, index=True)
    model = Column(String, index=True)
    transmission = Column(String, index=True)
    fuel_type = Column(String, index=True)
    engine_cc = Column(Integer, nullable=True)  # Make sure engine_cc is nullable if it can be None
    year = Column(Integer)
    vehicle_price = Column(Integer)
   
  
  

class ModelMap(Base):
    __tablename__ = "model_map"

    id = Column(Integer, primary_key=True, index=True)
    make = Column(String, nullable=False)
    model = Column(String, nullable=False)
    map_model_name = Column(String, nullable=False)