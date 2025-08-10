-- Initialize database schema for flood disease predictor

-- Enable PostGIS extension for geospatial data
CREATE EXTENSION IF NOT EXISTS postgis;

-- Create tables for storing prediction data
CREATE TABLE IF NOT EXISTS regions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    province VARCHAR(100) NOT NULL,
    coordinates GEOMETRY(POINT, 4326),
    population INTEGER,
    area_km2 FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS flood_predictions (
    id SERIAL PRIMARY KEY,
    region_id INTEGER REFERENCES regions(id),
    prediction_date TIMESTAMP NOT NULL,
    flood_risk_score FLOAT NOT NULL,
    confidence_level FLOAT NOT NULL,
    factors JSONB,
    model_version VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS disease_predictions (
    id SERIAL PRIMARY KEY,
    region_id INTEGER REFERENCES regions(id),
    disease_type VARCHAR(100) NOT NULL,
    prediction_date TIMESTAMP NOT NULL,
    outbreak_probability FLOAT NOT NULL,
    predicted_cases INTEGER,
    timeframe_days INTEGER,
    confidence_level FLOAT NOT NULL,
    risk_factors JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS alerts (
    id SERIAL PRIMARY KEY,
    region_id INTEGER REFERENCES regions(id),
    alert_type VARCHAR(50) NOT NULL,
    severity VARCHAR(20) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    diseases TEXT[],
    population_at_risk INTEGER,
    status VARCHAR(20) DEFAULT 'active',
    response_teams TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS resource_deployments (
    id SERIAL PRIMARY KEY,
    deployment_type VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    coordinates GEOMETRY(POINT, 4326),
    status VARCHAR(50) NOT NULL,
    capacity INTEGER,
    team_size INTEGER,
    supplies JSONB,
    deployed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS medical_inventory (
    id SERIAL PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL,
    available_quantity INTEGER NOT NULL,
    required_quantity INTEGER NOT NULL,
    unit VARCHAR(50),
    location VARCHAR(255),
    expiry_date DATE,
    status VARCHAR(50),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample regions
INSERT INTO regions (name, province, coordinates, population, area_km2) VALUES
('Larkana District', 'Sindh', ST_GeomFromText('POINT(68.2123 27.5590)', 4326), 450000, 6952),
('Rajanpur District', 'Punjab', ST_GeomFromText('POINT(70.3301 29.1044)', 4326), 320000, 8420),
('Jaffarabad', 'Balochistan', ST_GeomFromText('POINT(68.0378 28.0226)', 4326), 280000, 2445),
('Dera Ismail Khan', 'KPK', ST_GeomFromText('POINT(70.9012 31.8311)', 4326), 180000, 9334);

-- Insert sample medical inventory
INSERT INTO medical_inventory (item_name, available_quantity, required_quantity, unit, location, status) VALUES
('ORS Packets', 15000, 8000, 'packets', 'Central Warehouse Karachi', 'sufficient'),
('Antibiotics', 2500, 3000, 'vials', 'Central Warehouse Karachi', 'low'),
('Mosquito Nets', 8000, 5000, 'pieces', 'Regional Warehouse Lahore', 'sufficient'),
('Water Purification Tablets', 1200, 2000, 'tablets', 'Regional Warehouse Quetta', 'critical'),
('Rapid Test Kits', 500, 800, 'kits', 'Provincial Warehouse Peshawar', 'low'),
('IV Fluids', 3000, 1500, 'bags', 'Central Warehouse Karachi', 'sufficient');

-- Create indexes for better performance
CREATE INDEX idx_regions_coordinates ON regions USING GIST (coordinates);
CREATE INDEX idx_flood_predictions_region_date ON flood_predictions (region_id, prediction_date);
CREATE INDEX idx_disease_predictions_region_date ON disease_predictions (region_id, prediction_date);
CREATE INDEX idx_alerts_status ON alerts (status);
CREATE INDEX idx_resource_deployments_status ON resource_deployments (status);
