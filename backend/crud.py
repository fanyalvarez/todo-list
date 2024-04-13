from datetime import timedelta, datetime, timezone
from typing import Annotated
from fastapi import Depends, HTTPException, status, Header
from sqlmodel import Session
from fastapi.security import (
    HTTPAuthorizationCredentials,
    HTTPBearer,
    OAuth2PasswordBearer,
)
from passlib.context import CryptContext
from jose import JWTError, jwt
from db import SECRET_KEY, ALGORITHM

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def create_access_token(email: str, user_id: int, expires_delta: timedelta):
    enconde = {"sub": email, "id": user_id}
    expires = datetime.now(timezone.utc) + expires_delta
    enconde.update({"exp": expires})
    return jwt.encode(enconde, SECRET_KEY, algorithm=ALGORITHM)


bearer_scheme = HTTPBearer()


async def get_current_user(
    token: HTTPAuthorizationCredentials = Depends(bearer_scheme),
):
    try:
        payload = jwt.decode(token.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub", "")
        user_id: int = payload.get("id", "")
        if email is None or user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="User invalidated"
            )

        return user_id
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate user"
        )


user_dependency = Annotated[int, Depends(get_current_user)]
