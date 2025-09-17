from datetime import datetime
from sqlmodel import Session, select
from .models import Todo, TodoEntry

def get_todos_db(session: Session):
    return session.exec(select(Todo).order_by(Todo.id.desc())).all() 

def get_todo_db(id: int, session: Session):
    todo = session.get(Todo, id)
    
    if todo is None:
        return None
    
    structured_todo = {
        "id": todo.id,
        "name": todo.name,
        "description": todo.description,
        "date_created": todo.date_created,
        "entries": todo.entries
    }
    
    return structured_todo


    
def create_todo_db(
    session: Session,
    name: str,
    description: str | None = None,
):
    todo = Todo(name=name, description=description, date_created=str(datetime.now()))

    if todo is None:
        return None
    
    session.add(todo)
    session.commit()
    session.refresh(todo)

    return todo


def delete_todo_db(session: Session, id: int):
    todo = session.get(Todo, id)
    if todo is None:
        return None
    
    session.delete(todo)
    session.commit()

    return todo

def update_todo_db(
    session: Session,
    id: int,
    name: str | None = None,
    description: str | None = None
):
    todo = session.get(Todo, id)
    if todo is None:
        return None
    
    if name:
        todo.name = name
    if description:
        todo.description = description

    session.add(todo)
    session.commit()
    session.refresh(todo)

    return todo

# Todo entries

def create_entry_db(
    session: Session,
    text: str,
    todo_id: int,
):
    todo = session.get(Todo, todo_id)
    if todo is None:
        return None

    entry = TodoEntry(
        text=text,
        todo_id=todo_id,
        date_created=str(datetime.now()),
    )

    if entry is None:
        return None
    
    session.add(entry)
    session.commit()
    session.refresh(entry)

    return entry

def delete_entry_db(
    session: Session,
    id: int
):
    entry = session.get(TodoEntry, id)
    if entry is None:
        return None
    
    session.delete(entry)
    session.commit()
    
    return entry

def update_entry_db(
    session: Session,
    id: int,
    text: str | None = None,
    is_done: bool | None = None
):
    entry = session.get(TodoEntry, id)
    if entry is None:
        return None
    
    if text:
        entry.text = text
    if is_done:
        entry.is_done = is_done

    session.add(entry)
    session.commit()
    session.refresh(entry)

    return entry

def toggle_entry_is_done_db(
    session: Session,
    id: int,
):
    entry = session.get(TodoEntry, id)
    if entry is None:
        return None
    
    
    entry.is_done = not entry.is_done

    session.add(entry)
    session.commit()
    session.refresh(entry)

    return entry