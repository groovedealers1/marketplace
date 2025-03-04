import pathlib

from fastapi import APIRouter, UploadFile

from .admin.admin_comands import insert_products, delete_product


router = APIRouter(tags=['insert wear in db'], prefix='/admin')


@router.post('/insert_wear')
async def all_wears(name: str, price: int, files: list[UploadFile],
                    description: str, characteristics: str, colors: str,
                    collection: str = None, discount: int = None,
                    size_1: str = None, size_2: str = None, size_3: str = None, size_4: str = None, size_5: str = None,
                    size_6: str = None, quantity_1: int = None, quantity_2: int = None, quantity_3: int = None,
                    quantity_4: int = None, quantity_5: int = None, quantity_6: int = None):

    path_file = pathlib.Path(__file__).parent / 'frontend' / 'frontend-mock-marketplace' / 'public' / 'images'

    for file in files:
        content_file = await file.read()

        with open(f"{path_file}/{file.filename}", "wb") as f:
            f.write(content_file)

    await insert_products(
        name=name,
        price=price,
        collection=collection,
        discount=discount,
        description=description,
        characteristics=characteristics,
        colors=colors,

        name_for_image_1=files[0].filename,
        name_for_image_2=files[1].filename,
        name_for_image_3=files[2].filename,

        size_1=size_1,
        size_2=size_2,
        size_3=size_3,
        size_4=size_4,
        size_5=size_5,
        size_6=size_6,
        quantity_1=quantity_1,
        quantity_2=quantity_2,
        quantity_3=quantity_3,
        quantity_4=quantity_4,
        quantity_5=quantity_5,
        quantity_6=quantity_6
    )

    return f'<h1> You added: {name} </h1>'


@router.post('/delete_wear')
async def delete_wear(wear_id: int, wear_name: str) -> str:
    await delete_product(wear_id, wear_name)
    return 'success'
