from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
from datetime import datetime, timedelta
import json
from typing import List, Dict, Any
import asyncio
import random

from models.flood_predictor import FloodPredictor
from models.disease_outbreak_model import DiseaseOutbreakModel
from models.resource_optimizer import ResourceOptimizer
from models.data_preprocessor import DataPreprocessor
from database.connection import get_db_connection
from utils.mock_data import generate_mock_data

app = FastAPI(
    title="AI Flood-Disease Outbreak Predictor",
    description="Advanced AI system for predicting disease outbreaks linked to flood events",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize models
flood_predictor = FloodPredictor()
disease_model = DiseaseOutbreakModel()
resource_optimizer = ResourceOptimizer()
data_preprocessor = DataPreprocessor()

@app.get("/")
async def root():
    return {"message": "AI Flood-Disease Outbreak Predictor API", "status": "running"}

@app.get("/api/predictions/flood-risk")
async def get_flood_risk():
    """Get current flood risk predictions for all regions"""
    try:
        predictions = await flood_predictor.predict_flood_risk()
        return JSONResponse(content=predictions)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/predictions/disease-outbreak")
async def get_disease_predictions():
    """Get disease outbreak predictions based on current conditions"""
    try:
        predictions = await disease_model.predict_outbreaks()
        return JSONResponse(content=predictions)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/alerts/active")
async def get_active_alerts():
    """Get all active alerts"""
    mock_alerts = [
        {
            "id": 1,
            "type": "critical",
            "title": "Critical Cholera Outbreak Risk - Sindh Province",
            "location": "Larkana District, Sindh",
            "description": "AI model predicts 92% probability of cholera outbreak within 7-10 days due to severe flooding and contaminated water sources.",
            "timestamp": datetime.now().isoformat(),
            "population": 45000,
            "diseases": ["Cholera", "Typhoid"],
            "status": "active",
            "responseTeams": ["WHO Pakistan", "Sindh Health Dept", "MSF"],
            "floodRisk": 92,
            "timeframe": "7-10 days"
        },
        {
            "id": 2,
            "type": "high",
            "title": "Dengue Outbreak Alert - Punjab Region",
            "location": "Rajanpur District, Punjab",
            "description": "Elevated dengue risk due to stagnant flood water and increased mosquito breeding sites.",
            "timestamp": (datetime.now() - timedelta(hours=2)).isoformat(),
            "population": 32000,
            "diseases": ["Dengue", "Malaria"],
            "status": "active",
            "responseTeams": ["Punjab Health Dept", "District Administration"],
            "floodRisk": 78,
            "timeframe": "14-21 days"
        }
    ]
    return JSONResponse(content=mock_alerts)

@app.get("/api/resources/deployments")
async def get_resource_deployments():
    """Get current resource deployments"""
    deployments = await resource_optimizer.get_current_deployments()
    return JSONResponse(content=deployments)

@app.get("/api/resources/inventory")
async def get_inventory():
    """Get current medical supply inventory"""
    inventory = [
        {"item": "ORS Packets", "available": 15000, "required": 8000, "status": "sufficient"},
        {"item": "Antibiotics", "available": 2500, "required": 3000, "status": "low"},
        {"item": "Mosquito Nets", "available": 8000, "required": 5000, "status": "sufficient"},
        {"item": "Water Purification Tablets", "available": 1200, "required": 2000, "status": "critical"},
        {"item": "Rapid Test Kits", "available": 500, "required": 800, "status": "low"},
        {"item": "IV Fluids", "available": 3000, "required": 1500, "status": "sufficient"},
    ]
    return JSONResponse(content=inventory)

@app.get("/api/data/sources")
async def get_data_sources():
    """Get status of all data sources"""
    sources = await data_preprocessor.get_data_source_status()
    return JSONResponse(content=sources)

@app.get("/api/analytics/risk-trends")
async def get_risk_trends():
    """Get disease risk trend analytics"""
    trends = await disease_model.get_disease_trends()
    return JSONResponse(content=trends)

@app.post("/api/alerts/{alert_id}/acknowledge")
async def acknowledge_alert(alert_id: int):
    """Acknowledge an alert"""
    return {"message": f"Alert {alert_id} acknowledged", "status": "success"}

@app.post("/api/alerts/{alert_id}/resolve")
async def resolve_alert(alert_id: int):
    """Resolve an alert"""
    return {"message": f"Alert {alert_id} resolved", "status": "success"}

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "services": {
            "database": "connected",
            "redis": "connected", 
            "ai_models": "loaded"
        }
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
