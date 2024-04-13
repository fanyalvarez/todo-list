from datetime import timedelta, datetime
import logging
from typing import Annotated, Optional
from fastapi import Depends, FastAPI, HTTPException, status
from jose import JWTError, jwt
import models
from db import ALGORITHM, SECRET_KEY, engine
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from repo import UserRepoException
from schemas import UserCreate, NotesBase, Token, TokenData
from crud import (
    create_access_token,
    get_password_hash,
    user_dependency,
    pwd_context,
    get_current_user,
)
from db import SessionLocal
from handler import Handler, handler


app = FastAPI()


models.Base.metadata.create_all(bind=engine)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "DELETE", "PUT"],
    allow_headers=["*"],
)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]


@app.get("/")
def root():
    return "Hola, Mundo"


# Create user
@app.post("/create/user")
async def create_user_account(new_user: UserCreate) -> Token:
    try:
        return handler.handle_create(new_user)
    except UserRepoException:
        raise HTTPException(status_code=409, detail="Algo fallo, pero no fui yo")


@app.post("/token", response_model=Token)
async def login_for_access_token(credentials: TokenData, db: db_dependency):
    user = authenticate_user(credentials.email, credentials.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="User not validated"
        )
    token = create_access_token(user.email, user.id, timedelta(minutes=20))

    return {"token_type": "bearer", "access_token": token}


def authenticate_user(email: str, password: str, db: db_dependency):
    user = db.query(models.UserModel).filter(models.UserModel.email == email).first()
    if not user:
        return False
    if not pwd_context.verify(password, user.hashed_password):
        return False
    return user


@app.get("/user/me", status_code=status.HTTP_200_OK)
async def user(user_id: user_dependency):
    return {"user_id": user_id}


# Note by id
@app.get("/note/{note_id}")
async def get_note(note_id: int, db: db_dependency):
    result = db.query(models.Notes).filter(models.Notes.id == note_id).first()
    if not result:
        raise HTTPException(status_code=404, detail="ToDoNote not found")
    return result


@app.get("/read/note/{user_id}/{note_id}")
async def read_note_user(user_id: int, note_id: int, db: db_dependency):
    user = db.query(models.UserModel).filter(models.UserModel.id == user_id).first()
    note = db.query(models.Notes).filter(models.Notes.id == note_id).first()
    if not note:
        raise HTTPException(status_code=404, detail="ToDoNote not found")
    if not user:
        raise HTTPException(status_code=404, detail="ToDoNote not found")
    return note


# Create note by user id
@app.post("/users/notes/")
async def create_item_for_user(
    note: NotesBase,
    db: db_dependency,
    user_id: Annotated[int, Depends(get_current_user)],
):
    db_note = models.Notes(
        title=note.title, description=note.description, user_id=user_id
    )
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note


@app.get("/read/note")
async def read_note(
    db: db_dependency,
    user_id: Annotated[int, Depends(get_current_user)],
):
    all_note = db.query(models.Notes).filter(models.Notes.user_id == user_id).all()
    return all_note


# Update notes by id
@app.put("/note/update/{note_id}")
async def update_note(note_id: int, note: NotesBase, db: db_dependency):
    update = db.query(models.Notes).filter(models.Notes.id == note_id).first()
    update.title = note.title
    update.description = note.description
    db.commit()
    db.refresh(update)
    return update


# Delete note by id
@app.delete("/delete/note/{note_id}/")
async def delete_note(note_id: int, db: db_dependency):
    note = db.query(models.Notes).filter(models.Notes.id == note_id).first()
    db.delete(note)
    db.commit()
    return {"Message": "Note deleted"}
