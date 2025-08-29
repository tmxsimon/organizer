from sqlmodel import SQLModel, Session, create_engine
from .tools.models import *
from .tools.comparators.models import *

db_file_name = "main.db"
db_url = f"sqlite:///./db/{db_file_name}"

engine = create_engine(db_url, echo=True)

def get_session():
    with Session(engine) as session:
        yield session

if __name__ == "__main__":  
    SQLModel.metadata.create_all(engine)