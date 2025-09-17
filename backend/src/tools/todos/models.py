from sqlmodel import SQLModel, Field, Relationship, desc
from src.tools.models import Tool

class Todo(Tool, table=True):
    entries: list["TodoEntry"] | None = Relationship(
        back_populates="todo",
        sa_relationship_kwargs={"order_by": desc("id")},
        cascade_delete=True
    )

class TodoEntry(SQLModel, table=True):
    __tablename__ = "todo_entry"

    id: int | None = Field(default=None, primary_key=True)
    todo_id: int = Field(foreign_key="todo.id")
    todo: Todo = Relationship(back_populates="entries")
    text: str
    is_done: bool = Field(default=False)
    date_created: str