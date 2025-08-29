from enum import Enum
from sqlmodel import SQLModel, Field, Relationship
from ..models import Tool

class Comparator(Tool, table=True):
    entries: list["ComparatorEntry"] | None = Relationship(back_populates="comparator", cascade_delete=True)

class ComparatorEntry(SQLModel, table=True):
    __tablename__ = "comparator_entry"

    id: int | None = Field(default=None, primary_key=True)
    comparator_id: int = Field(foreign_key="comparator.id")
    comparator: Comparator = Relationship(back_populates="entries")
    name: str
    date_created: str
    pros_cons: list["ProCon"] = Relationship(back_populates="entry", cascade_delete=True)


class TypeEnum(str, Enum):
    pro = "pro"
    con = "con"

class ProCon(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    type: TypeEnum
    entry_id: int = Field(foreign_key="comparator_entry.id")
    text: str
    entry: ComparatorEntry = Relationship(back_populates="pros_cons")