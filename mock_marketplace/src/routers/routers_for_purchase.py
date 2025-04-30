from fastapi import APIRouter

from mock_marketplace.src.posts import purchase_wear
from mock_marketplace.src.models import ProductModelPurchase

router = APIRouter(tags=['get users and  wear data and sending it to telegram bot'], prefix='/purchase')


@router.post('')
async def purchase(request_body: ProductModelPurchase):
    await purchase_wear(request_body)
