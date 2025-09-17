from datetime import datetime
from typing import Literal
from sqlmodel import Session, select
from .models import Comparator, ComparatorEntry, ProCon

def get_comparators_db(session: Session):
    return session.exec(select(Comparator).order_by(Comparator.id.desc())).all()

def get_comparator_db(session: Session, id: int):
    comparator = session.get(Comparator, id)
    if comparator is None:
        return None
    
    structured_entries = []
    for entry in comparator.entries:
        structured_entries.append({
            "id": entry.id,
            "name": entry.name,
            "pros_cons": entry.pros_cons,
        })
    
    structured_comparator = {
        "id": comparator.id,
        "name": comparator.name,
        "description": comparator.description,
        "date_created": comparator.date_created,
        "entries": structured_entries
    }

    return structured_comparator

def create_comparator_db(
    session: Session,
    name: str,
    description: str | None = None,
):
    comparator = Comparator(name=name, description=description, date_created=str(datetime.now()))
    if comparator is None:
        return None
    
    session.add(comparator)
    session.commit()
    session.refresh(comparator)

    return comparator

def delete_comparator_db(session: Session, id: int):
    comparator = session.get(Comparator, id)
    if comparator is None:
        return None
    
    session.delete(comparator)
    session.commit()

    return comparator

def update_comparator_db(
    session: Session,
    id: int,
    name: str | None = None,
    description: str | None = None
):
    comparator = session.get(Comparator, id)
    if comparator is None:
        return None
    
    if name:
        comparator.name = name
    if description:
        comparator.description = description

    session.add(comparator)
    session.commit()
    session.refresh(comparator)

    return comparator


# Comparator entries

def create_entry_db(
    session: Session,
    name: str,
    comparator_id: int,
):
    comparator = session.get(Comparator, comparator_id)
    if comparator is None:
        return None

    comparator_entry = ComparatorEntry(
        name=name,
        comparator_id=comparator_id,
        date_created=str(datetime.now()),
    )

    if comparator_entry is None:
        return None
    
    session.add(comparator_entry)
    session.commit()
    session.refresh(comparator_entry)

    return comparator_entry

def delete_entry_db(
    session: Session,
    id: int
):
    entry = session.get(ComparatorEntry, id)
    if entry is None:
        return None
    
    session.delete(entry)
    session.commit()
    
    return entry

def update_entry_db(
    session: Session,
    id: int,
    name: str,
):
    entry = session.get(ComparatorEntry, id)
    if entry is None:
        return None
    
    entry.name = name

    session.add(entry)
    session.commit()
    session.refresh(entry)

    return entry


# Pros and Cons

def create_pro_con_db(
    session: Session,
    entry_id: int,
    text: str,
    type: Literal["pro", "con"]
):
    pro_con = ProCon(type=type, entry_id=entry_id, text=text)

    if pro_con is None:
        return None
        
    session.add(pro_con)
    session.commit()
    session.refresh(pro_con)

    return pro_con
    

def delete_pro_con_db(
    session: Session,
    id: int
):
    pro_con = session.get(ProCon, id)
    if pro_con is None:
        return None
    
    session.delete(pro_con)
    session.commit()

    return pro_con

def update_pro_con_db(
    session: Session,
    id: int,
    text: str,
):
    pro_con = session.get(ProCon, id)
    if pro_con is None:
        return None
    
    pro_con.text = text

    session.add(pro_con)
    session.commit()
    session.refresh(pro_con)

    return pro_con