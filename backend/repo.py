from schemas import UserCreate, NotesBase, Token, TokenData
from db import SessionLocal
from models import UserModel
import logging


class UserRepoException(Exception):
    def __init__(self):
        self.message = "Failed user db operation"


class UserRepo:
    def __init__(self, db):
        self._db = db
        self._logger = logging.getLogger(__name__)

    def create_user(self, new_user: UserCreate):
        try:
            db_user = UserModel(
                email=new_user.email,
                nickname=new_user.nickname,
                full_name=new_user.full_name,
                hashed_password=new_user.hashed_password,
                registered_at=new_user.registered_at,
                updated_at=new_user.updated_at,
            )

            self._db.add(db_user)
            self._db.commit()
            self._db.refresh(db_user)

            return db_user
        except Exception as e:
            print(e)
            raise UserRepoException()


user_repo = UserRepo(SessionLocal())
