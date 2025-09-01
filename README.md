# Organizer

Helps to organize your everyday tasks with different tools


# Setup Instructions
## Backend
### Open a terminal and go to the backend folder
cd backend

### Create and activate a virtual environment
python -m venv .venv
source .venv/bin/activate

### Install dependencies
pip install -r requirements.txt

### Run the backend server
uvicorn src.main:app --reload

## Frontend
### Open a new terminal and go to the frontend folder
cd frontend

### Install dependencies
npm install

### Run the frontend dev server
npm run dev
