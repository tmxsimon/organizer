from fastapi import APIRouter, HTTPException, status
from src.dependencies import SessionDep
from .service import (
  get_todo_db,
  get_todos_db,
  create_todo_db,
  delete_todo_db,
  update_todo_db,

  create_entry_db,
  delete_entry_db,
  update_entry_db,
  toggle_entry_is_done_db
)

router = APIRouter(
  prefix="/tools/todos",
  tags=["Todos"]
)

@router.get("/")
async def get_todos(session = SessionDep):
  todos = get_todos_db(session=session)

  return todos

@router.get("/{id}")
async def get_todo(id: int, session = SessionDep):
    todo = get_todo_db(session=session, id=id)
    if todo is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found"
        )
    
    return todo

@router.post("/")
async def create_todo(
    name: str,
    description: str | None = None,
    session = SessionDep
):
    todo = create_todo_db(session=session, name=name, description=description)
    if todo is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Todo not created"
        )
    
    return todo

@router.delete("/{id}")
async def delete_todo(
    id: int,
    session = SessionDep
):
    result = delete_todo_db(session=session, id=id)
    if not result:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Todo not deleted"
        )
    return result

@router.put("/{id}")
async def update_todo(
    id: int,
    name: str | None = None,
    description: str | None = None,
    session = SessionDep
):
    result = update_todo_db(
        session=session,
        id=id,
        name=name,
        description=description
    )
    if result is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Todo not updated"
        )
    
    return result

# -------

@router.post("/{todo_id}/entries")
async def create_entry(
    todo_id: int,
    text: str,
    session = SessionDep
):
    entry = create_entry_db(session=session, text=text, todo_id=todo_id)
    if entry is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Todo entry not created"
        )
    
    return entry

@router.delete("/entries/{id}")
async def delete_entry(
    id: int,
    session = SessionDep
):
    result = delete_entry_db(session=session, id=id)
    if result is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Entry not deleted"
        )
    return result

@router.put("/entries/{id}")
async def update_entry(
    id: int,
    text: str | None = None,
    is_done: bool | None = None,
    session = SessionDep
):
    result = update_entry_db(
        session=session,
        id=id,
        text=text,
        is_done=is_done
    )
    if result is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Entry not updated"
        )
    
    return result

@router.put("/entries/{id}/toggle")
async def toggle_entry_is_done(
    id: int,
    session = SessionDep
):
    result = toggle_entry_is_done_db(
        session=session,
        id=id
    )
    if result is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Entry not updated"
        )
    
    return result