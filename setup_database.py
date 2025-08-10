#!/usr/bin/env python3
"""
Database setup script for the Flood Disease Predictor
Run this script to initialize the database with sample data
"""

import asyncio
import asyncpg
import os
from datetime import datetime, timedelta
import json

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:password@localhost:5432/flood_predictor")

async def setup_database():
    """Initialize database with sample data"""
    
    try:
        # Connect to database
        conn = await asyncpg.connect(DATABASE_URL)
        print("✅ Connected to database successfully")
        
        # Read and execute init.sql
        with open('init.sql', 'r') as f:
            init_sql = f.read()
        
        await conn.execute(init_sql)
        print("✅ Database schema created successfully")
        
        # Insert sample flood predictions
        regions = await conn.fetch("SELECT id, name FROM regions")
        
        for region in regions:
            for i in range(30):  # Last 30 days of predictions
                prediction_date = datetime.now() - timedelta(days=29-i)
                flood_risk = max(0, min(100, 50 + (i * 2) + ((-1)**i * 10)))
                
                await conn.execute("""
                    INSERT INTO flood_predictions (region_id, prediction_date, flood_risk_score, confidence_level, factors, model_version)
                    VALUES ($1, $2, $3, $4, $5, $6)
                """, region['id'], prediction_date, flood_risk, 85.0 + (i % 10), 
                json.dumps({"rainfall": 70, "river_level": 60, "soil_saturation": 80}), "v1.2.3")
        
        print("✅ Sample flood predictions inserted")
        
        await conn.close()
        print("🎉 Database setup completed successfully!")
        
    except Exception as e:
        print(f"❌ Database setup failed: {e}")
        raise

if __name__ == "__main__":
    asyncio.run(setup_database())
