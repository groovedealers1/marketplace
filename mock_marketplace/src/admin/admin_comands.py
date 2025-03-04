from os import remove

from sqlalchemy import delete

from ..posts.database import async_session
from ..posts.models import Products, Images, Sizes, Quantity


async def insert_products(name: str, price: int, collection: str | None, discount: int | None,
                          description: str, characteristics: str, colors: str,
                          name_for_image_1: str, name_for_image_2: str, name_for_image_3: str,
                          size_1: str, size_2: str, size_3: str, size_4: str, size_5: str, size_6: str,
                          quantity_1: int, quantity_2: int, quantity_3: int, quantity_4: int, quantity_5: int, quantity_6: int) -> None:

    async with async_session() as session:
        wear = Products(
            name=name,
            price=price,
            collection=collection,
            discount=discount,
            description=description,
            characteristics=characteristics,
            colors=colors,
        )
        wear.images = [Images(name_for_image_1=name_for_image_1, name_for_image_2=name_for_image_2, name_for_image_3=name_for_image_3)]
        wear.sizes = [Sizes(size_1=size_1, size_2=size_2, size_3=size_3, size_4=size_4, size_5=size_5, size_6=size_6)]
        wear.quantity = [Quantity(quantity_1=quantity_1, quantity_2=quantity_2, quantity_3=quantity_3,
                                  quantity_4=quantity_4, quantity_5=quantity_5, quantity_6=quantity_6)]

        session.add(wear)
        await session.commit()


async def delete_product(wear_id: int, wear_name: str) -> None:
    async with async_session() as session:

        stmt_1 = delete(Products).where(wear_id == Products.id)
        await session.execute(stmt_1)

        stmt_2 = delete(Images).where(wear_id == Images.id)
        await session.execute(stmt_2)

        stmt_3 = delete(Sizes).where(wear_id == Sizes.id)
        await session.execute(stmt_3)


        await session.commit()

    remove(f'src/frontend/frontend-mock-marketplace/public/images/raremod_{wear_name}_1.jpg')
    remove(f'src/frontend/frontend-mock-marketplace/public/images/raremod_{wear_name}_2.jpg')
    remove(f'src/frontend/frontend-mock-marketplace/public/images/raremod_{wear_name}_3.jpg')
