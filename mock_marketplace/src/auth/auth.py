from fastapi_users.authentication import AuthenticationBackend, JWTStrategy, BearerTransport
from mock_marketplace import settings


cookie_transport = BearerTransport('auth/jwt/login')
SECRET = f"{settings.COOKIE_SECRET}"


def get_jwt_strategy() -> JWTStrategy:
    return JWTStrategy(secret=SECRET, lifetime_seconds=3600)


auth_backend = AuthenticationBackend(
    name="jwt",
    transport=cookie_transport,
    get_strategy=get_jwt_strategy,
)
