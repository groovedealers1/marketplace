from typing import Any

from sqlalchemy import select
from sqlalchemy.orm import selectinload

from .database import async_session
from .models import Products

from ..tg_bot.telegram_bot import send_message
from ..auth.database import User


async def get_all_wears() -> list[dict[str, Any]]:
    async with async_session() as session:
        stmt = select(Products).options(selectinload(Products.images))
        res = await session.execute(stmt)
        result = res.scalars().all()

        return result


async def get_wear_by_id(wear_id: int) -> dict[str, int | str | None]:
    async with async_session() as session:
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


async def purchase_wear(wear_data) -> None:
    await send_message(wear_data)
    async with async_session() as session:
        stmt = (
            select(Products)
            .where(wear_data["id"] == Products.id)
            .options(
                selectinload(Products.quantity),
                selectinload(Products.sizes)
            )
        )
        res = await session.execute(stmt)
        wear = res.scalars().first()

        if wear_data["numberOfQuantity"] == 'quantity_1':
            if wear.quantity[0].quantity_1 == wear_data["quantity"]:
                wear.sizes[0].size_1 = None
                wear.quantity[0].quantity_1 = None
            else:
                wear.quantity[0].quantity_1 -= wear_data["quantity"]
        elif wear_data["numberOfQuantity"] == 'quantity_2':
            if wear.quantity[0].quantity_2 == wear_data["quantity"]:
                wear.sizes[0].size_2 = None
                wear.quantity[0].quantity_2 = None
            else:
                wear.quantity[0].quantity_2 -= wear_data["quantity"]
        elif wear_data["numberOfQuantity"] == 'quantity_3':
            if wear.quantity[0].quantity_3 == wear_data["quantity"]:
                wear.sizes[0].size_3 = None
                wear.quantity[0].quantity_3 = None
            else:
                wear.quantity[0].quantity_3 -= wear_data["quantity"]
        elif wear_data["numberOfQuantity"] == 'quantity_4':
            if wear.quantity[0].quantity_4 == wear_data["quantity"]:
                wear.sizes[0].size_4 = None
                wear.quantity[0].quantity_4 = None
            else:
                wear.quantity[0].quantity_4 -= wear_data["quantity"]
        elif wear_data["numberOfQuantity"] == 'quantity_5':
            if wear.quantity[0].quantity_5 == wear_data["quantity"]:
                wear.sizes[0].size_5 = None
                wear.quantity[0].quantity_5 = None
            else:
                wear.quantity[0].quantity_5 -= wear_data["quantity"]
        elif wear_data["numberOfQuantity"] == 'quantity_6':
            if wear.quantity[0].quantity_6 == wear_data["quantity"]:
                wear.sizes[0].size_6 = None
                wear.quantity[0].quantity_6 = None
            else:
                wear.quantity[0].quantity_6 -= wear_data["quantity"]

        await session.commit()
