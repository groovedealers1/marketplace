from typing import Any

from sqlalchemy import select
from sqlalchemy.orm import selectinload

from .database import async_session
from .models import Products


async def get_all_wears() -> list[dict[str, Any]]:
    async with async_session() as session:
        stmt = select(Products).options(selectinload(Products.images))
        res = await session.execute(stmt)
        result = res.scalars().all()

        return result


async def get_wear_by_id(wear_id: int) -> dict[str, int | str | None]:
    async with (async_session() as session):
        stmt = (
            select(Products).where(wear_id == Products.id)
            .options(
             selectinload(Products.images),
                     selectinload(Products.sizes),
                     selectinload(Products.quantity),
                    )
        )
        res = await session.execute(stmt)
        result = res.scalars().all()

        return result
