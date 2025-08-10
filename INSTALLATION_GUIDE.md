# 🚀 Complete Installation Guide

## System Requirements

- **Operating System**: Windows 10+, macOS 10.15+, or Linux Ubuntu 18.04+
- **Node.js**: Version 18.0 or higher
- **Python**: Version 3.9 or higher
- **RAM**: Minimum 8GB (16GB recommended)
- **Storage**: At least 5GB free space
- **Internet**: Required for API data sources

## Step-by-Step Installation

### 1. Download and Extract

1. Download the complete project zip file
2. Extract to your desired location (e.g., `C:\flood-predictor` or `~/flood-predictor`)
3. Open terminal/command prompt in the project directory

### 2. Install Node.js Dependencies

\`\`\`bash
# Install frontend dependencies
npm install

# If you encounter permission errors on Windows, run as administrator
# If you encounter errors on macOS/Linux, try:
sudo npm install
\`\`\`

### 3. Install Python Dependencies

\`\`\`bash
# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install Python packages
pip install -r requirements.txt
\`\`\`

### 4. Database Setup

#### Option A: Using Docker (Recommended)
\`\`\`bash
# Install Docker Desktop from https://www.docker.com/products/docker-desktop
# Start all services with one command
docker-compose up -d

# Wait for services to start (about 2-3 minutes)
# Check if services are running
docker-compose ps
\`\`\`

#### Option B: Manual Database Setup
\`\`\`bash
# Install PostgreSQL 13+ with PostGIS extension
# Install Redis 6+

# Create database
createdb flood_predictor

# Set up database schema and sample data
cd backend
python setup_database.py
\`\`\`

### 5. Environment Configuration

\`\`\`bash
# Copy environment template
cp .env.example .env

# Edit .env file with your settings:
# - Database connection strings
# - API keys (optional for demo)
# - Application URLs
\`\`\`

### 6. Start the Application

#### Option A: Using Docker
\`\`\`bash
# All services start automatically with docker-compose
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
\`\`\`

#### Option B: Manual Start
\`\`\`bash
# Terminal 1: Start backend
cd backend
python -m uvicorn main:app --reload --port 8000

# Terminal 2: Start frontend
npm run dev

# Terminal 3: Start Redis (if not using Docker)
redis-server
\`\`\`

## 🔧 Troubleshooting

### Common Issues

**1. Port Already in Use**
\`\`\`bash
# Kill processes on ports 3000 and 8000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:3000 | xargs kill -9
lsof -ti:8000 | xargs kill -9
\`\`\`

**2. Database Connection Error**
\`\`\`bash
# Check if PostgreSQL is running
# Windows: Check Services
# macOS/Linux:
sudo systemctl status postgresql

# Reset database
cd backend
python setup_database.py
\`\`\`

**3. Python Package Installation Errors**
\`\`\`bash
# Update pip
python -m pip install --upgrade pip

# Install packages individually if bulk install fails
pip install fastapi uvicorn numpy pandas scikit-learn
\`\`\`

**4. Node.js Module Errors**
\`\`\`bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
\`\`\`

## 🎯 Verification Steps

### 1. Check All Services
\`\`\`bash
# Frontend should show dashboard at http://localhost:3000
# Backend API docs at http://localhost:8000/docs
# Database connection test
curl http://localhost:8000/api/health
\`\`\`

### 2. Test Core Features
1. ✅ Dashboard loads with maps and charts
2. ✅ Alerts tab shows active warnings
3. ✅ Resources tab displays deployments
4. ✅ Data integration tab shows connected sources
5. ✅ All interactive elements respond

### 3. API Functionality
\`\`\`bash
# Test key endpoints
curl http://localhost:8000/api/predictions/flood-risk
curl http://localhost:8000/api/alerts/active
curl http://localhost:8000/api/resources/inventory
\`\`\`

## 📱 Demo Mode

For demonstration purposes, the system includes:
- **Mock data** for all predictions and alerts
- **Simulated real-time updates** every 5 seconds
- **Interactive features** without requiring real API keys
- **Sample historical data** for trend analysis

## 🎉 Success!

Once everything is running, you should see:
- 🌐 **Frontend Dashboard** at http://localhost:3000
- 🔧 **API Documentation** at http://localhost:8000/docs
- 📊 **Real-time data updates** every few seconds
- 🗺️ **Interactive maps** with risk zones
- 🚨 **Alert system** with notifications
- 📈 **Analytics charts** with trends

**You're now ready to demonstrate the AI-Powered Flood-Disease Outbreak Predictor!**
