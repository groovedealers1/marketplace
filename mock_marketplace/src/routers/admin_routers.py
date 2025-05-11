import pathlib

from fastapi import APIRouter, UploadFile

from mock_marketplace.src.admin.admin_comands import insert_products, delete_product
from mock_marketplace.src.models import ProductModelDELETE, ProductModelBase, ImagesModel, SizeModel, QuantitiesModel


router = APIRouter(tags=['insert wear in db'], prefix='/admin')


@router.post('/insert_wear')
async def all_wears(product_data: ProductModelBase, sizes_data: SizeModel,
                    quantities_data: QuantitiesModel, images_data: ImagesModel) -> None:

    await insert_products(product_data, sizes_data, quantities_data, images_data)


@router.delete('/delete_wear')
async def delete_wear(data: ProductModelDELETE) -> None:
    await delete_product(data)


@router.post('/upload_images')
async def upload_images(files: list[UploadFile]):
    path_file = pathlib.Path(__file__).parent.parent / 'frontend' / 'frontend-mock-marketplace' / 'public' / 'images'

    try:
        for file in files:
            content_file = await file.read()

            with open(f"{path_file}/{file.filename}", "wb") as f:
                f.write(content_file)
    except Exception as e:
        print(e)
