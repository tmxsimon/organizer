from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .tools.comparators.router import router as comparator_router

app = FastAPI()

routers = [comparator_router]
for router in routers:
    app.include_router(router)

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
async def hello():
    return {"message": "Hello, World!"}