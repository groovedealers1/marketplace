from os import remove
from pathlib import Path

from sqlalchemy import delete

from ..posts.database import async_session
from ..posts.models import Products, Images, Sizes, Quantity
from mock_marketplace.src.models import ProductModelDELETE, ProductModelBase, ImagesModel, SizeModel, QuantitiesModel


async def insert_products(product_data: ProductModelBase, sizes_data: SizeModel,
                          quantities_data: QuantitiesModel, images_data: ImagesModel) -> None:

    async with async_session() as session:
        wear = Products(**product_data.model_dump())

        wear.images = [Images(**images_data.model_dump())]
        wear.sizes = [Sizes(**sizes_data.model_dump())]
        wear.quantities = [Quantity(**quantities_data.model_dump())]

        session.add(wear)
        await session.commit()


async def delete_product(data: ProductModelDELETE) -> None:
    async with async_session() as session:

        stmt_4 = delete(Quantity).where(data.wear_id == Quantity.id)
        await session.execute(stmt_4)

        stmt_3 = delete(Sizes).where(data.wear_id == Sizes.id)
        await session.execute(stmt_3)

        stmt_2 = delete(Images).where(data.wear_id == Images.id)
        await session.execute(stmt_2)

        stmt_1 = delete(Products).where(data.wear_id == Products.id)
        await session.execute(stmt_1)

        await session.commit()

    # /mock_marketplace/mock_marketplace/src/frontend/frontend-mock-marketplace/public/images
    BASE_DIR = Path(__file__).resolve().parent.parent / 'frontend' / 'frontend-mock-marketplace' / 'public' / 'images'

    for i in range(1, 4): remove(f'{BASE_DIR}/raremod_{data.wear_name}_{i}.jpg')
