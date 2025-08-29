from typing import Literal
from fastapi import APIRouter, Form, HTTPException, status
from ...dependencies import SessionDep
from .service import (
    get_comparators_db,
    get_comparator_db,
    create_comparator_db,
    delete_comparator_db,
    update_comparator_db,
    create_entry_db,
    delete_entry_db,
    update_entry_db,
    create_pro_con_db,
    delete_pro_con_db,
    update_pro_con_db,
)

router = APIRouter(
    prefix="/tools/comparators",
    tags=["Comparator"]
)

@router.get("/")
async def get_comparators(session = SessionDep):
    comparators = get_comparators_db(session=session)
    
    return comparators


@router.get("/{id}")
async def get_comparator(id: int, session = SessionDep):
    comparator = get_comparator_db(session=session, id=id)
    if comparator is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Comparator not found"
        )
    
    return comparator

@router.post("/")
async def create_comparator(
    name: str,
    description: str | None = None,
    session = SessionDep
):
    comparator = create_comparator_db(session=session, name=name, description=description)
    if comparator is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Comparator not created"
        )
    
    return comparator

@router.delete("/{id}")
async def delete_comparator(
    id: int,
    session = SessionDep
):
    result = delete_comparator_db(session=session, id=id)
    if not result:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Comparator not deleted"
        )
    return result


@router.put("/{id}")
async def update_comparator(
    id: int,
    name: str | None = None,
    description: str | None = None,
    session = SessionDep
):
    result = update_comparator_db(
        session=session,
        id=id,
        name=name,
        description=description
    )
    if result is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Comparator not updated"
        )
    
    return result

# -------

@router.post("/{comparator_id}/entries")
async def create_comparator_entry(
    comparator_id: int,
    name: str,
    session = SessionDep
):
    entry = create_entry_db(session=session, name=name, comparator_id=comparator_id)
    if entry is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Comparator entry not created"
        )
    
    return {"entry": entry, "pros_cons": entry.pros_cons}

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
    name: str,
    session = SessionDep
):
    result = update_entry_db(
        session=session,
        id=id,
        name=name
    )
    if result is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Entry not updated"
        )
    
    return result



# Pros and Cons


@router.post("/entries/{entry_id}")
async def create_entry_pro_con(
    entry_id: int,
    type: Literal["pro", "con"],
    text: str,
    session = SessionDep,
):
    pro_con = create_pro_con_db(
        session=session,
        entry_id=entry_id,
        type=type,
        text=text
    )

    if pro_con is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"{type.capitalize()} not created"
        )
    
    return {type: pro_con}

@router.delete("/pros-cons/{id}")
async def delete_pro_con(
    id: int,
    session = SessionDep
):
    result = delete_pro_con_db(session=session, id=id)

    return result

@router.put("/pros-cons/{id}")
async def update_pro_con(
    id: int,
    text: str,
    session = SessionDep
):
    result = update_pro_con_db(
        session=session,
        id=id,
        text=text
    )
    if result is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="ProCon not updated"
        )
    
    return result

