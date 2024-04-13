from repo import UserRepo, user_repo
from datetime import timedelta, datetime
from schemas import UserCreate, NotesBase, Token, TokenData
from crud import create_access_token, get_password_hash, user_dependency, pwd_context


class Handler:
    def __init__(self, repo: UserRepo):
        self._repo = repo

    def handle_create(self, new_user: UserCreate) -> Token:
        pwd_hash = get_password_hash(new_user.hashed_password)
        new_user.hashed_password = pwd_hash
        new_user.registered_at = datetime.now()
        new_user.updated_at = datetime.now()

        created_user = self._repo.create_user(new_user)

        token = create_access_token(
            str(created_user.email),
            created_user.id,  # type: ignore
            timedelta(minutes=200),
        )

        return Token(access_token=token, token_type="bearer")


handler = Handler(user_repo)
