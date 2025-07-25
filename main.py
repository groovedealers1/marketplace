import uvicorn

from fastapi import FastAPI
from fastapi_users import FastAPIUsers
from fastapi.middleware.cors import CORSMiddleware

# from mock_marketplace.src.auth.schemas import UserRead, UserCreate
from mock_marketplace.src.auth.database import User
from mock_marketplace.src.auth.auth import auth_backend
from mock_marketplace.src.auth.manager import get_user_manager

from mock_marketplace.src.routers.routers_for_wears import router as wears_router
from mock_marketplace.src.routers.routers_for_purchase import router as purchase_router
from mock_marketplace.src.routers.admin_routers import router as admin_router


origins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174',
    'http://localhost:5174',
    ]

app = FastAPI(title='Own Online Market', version='0.1')

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

fastapi_users = FastAPIUsers[User, int](
    get_user_manager,
    [auth_backend],
)

app.include_router(router=admin_router)
app.include_router(router=wears_router)
app.include_router(router=purchase_router)
app.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth/jwt",
    tags=["auth"],
)
# app.include_router(
#     fastapi_users.get_register_router(UserRead, UserCreate),
#     prefix="/auth",
#     tags=["auth"],
# )

if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)
