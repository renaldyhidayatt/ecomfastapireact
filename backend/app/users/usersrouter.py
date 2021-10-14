from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from config.database import get_db
from models.usermodels import User
from dto.userschema import RegisterUser
from .usersservice import UserService
from config.token import get_currentUser

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/")
def getAllUser(db: Session = Depends(get_db)):
    return UserService.get_allUser(db=db)


@router.post("/")
def createUser(user: RegisterUser, db: Session = Depends(get_db)):
    return UserService.create_user(user, db)


@router.get("/me")
def getMe(current_user: User = Depends(get_currentUser)):
    return current_user


@router.put("/{userid}")
def updateUser(userid: int, user: RegisterUser, db: Session = Depends(get_db)):
    return UserService.update_user(userid=userid, user=user, db=db)


@router.delete("/{userid}")
def deleteUser(userid: int, db: Session = Depends(get_db)):
    return UserService.deleteUser(userid=userid, db=db)
