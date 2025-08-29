from sqlmodel import SQLModel, Field

class Tool(SQLModel):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    description: str | None = None
    date_created: str