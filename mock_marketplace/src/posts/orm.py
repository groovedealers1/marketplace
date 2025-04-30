from sqlalchemy import select
from sqlalchemy.orm import selectinload

from .database import async_session
from .models import Products

from mock_marketplace.src.models import ProductModelPurchase, ProductModelGET
from mock_marketplace.src.tg_bot import send_message


async def get_all_wears() -> list[ProductModelGET]:
    async with async_session() as session:
        stmt = (
            select(Products)
            .options(selectinload(Products.images))
            .limit(10)
        )
        res = await session.execute(stmt)
        result = res.scalars().all()

        return result


async def get_wear_by_id(wear_id: int) -> ProductModelGET:
    async with async_session() as session:
        stmt = (
            select(Products).where(wear_id == Products.id)
            .options(
                selectinload(Products.images),
                selectinload(Products.sizes),
                selectinload(Products.quantities),
            )
        )
        res = await session.execute(stmt)
        result = res.scalars().first()

        new_result = ProductModelGET(**result.__dict__)

        return new_result


async def purchase_wear(wear_data: ProductModelPurchase) -> None:
    await send_message(wear_data)

    async with async_session() as session:
        stmt = (
            select(Products)
            .where(wear_data.id == Products.id)
            .options(
                selectinload(Products.quantities),
                selectinload(Products.sizes)
            )
        )
        res = await session.execute(stmt)

        # wear object in db
        wear = res.scalars().first()

        if wear_data.number_of_quantity == 'quantity_1':
            if wear.quantities[0].quantity_1 == wear_data.quantity:
                wear.sizes[0].size_1 = None
                wear.quantities[0].quantity_1 = None
            else:
                wear.quantities[0].quantity_1 -= wear_data.quantity

        if wear_data.number_of_quantity == 'quantity_2':
            if wear.quantities[0].quantity_2 == wear_data.quantity:
                wear.sizes[0].size_2 = None
                wear.quantities[0].quantity_2 = None
            else:
                wear.quantities[0].quantity_2 -= wear_data.quantity

        if wear_data.number_of_quantity == 'quantity_3':
            if wear.quantities[0].quantity_3 == wear_data.quantity:
                wear.sizes[0].size_3 = None
                wear.quantities[0].quantity_3 = None
            else:
                wear.quantities[0].quantity_3 -= wear_data.quantity

        if wear_data.number_of_quantity == 'quantity_4':
            if wear.quantities[0].quantity_4 == wear_data.quantity:
                wear.sizes[0].size_4 = None
                wear.quantities[3].quantity_4 = None
            else:
                wear.quantities[0].quantity_4 -= wear_data.quantity

        if wear_data.number_of_quantity == 'quantity_5':
            if wear.quantities[0].quantity_5 == wear_data.quantity:
                wear.sizes[0].size_5 = None
                wear.quantities[0].quantity_5 = None
            else:
                wear.quantities[0].quantity_5 -= wear_data.quantity

        if wear_data.number_of_quantity == 'quantity_6':
            if wear.quantities[0].quantity_6 == wear_data.quantity:
                wear.sizes[0].size_6 = None
                wear.quantities[0].quantity_6 = None
            else:
                wear.quantities[0].quantity_6 -= wear_data.quantity

        await session.commit()
