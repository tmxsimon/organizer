from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .db import init_db
from .tools.comparators.router import router as comparator_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield
    pass

app = FastAPI(lifespan=lifespan)

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