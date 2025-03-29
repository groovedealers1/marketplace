from fastapi import APIRouter, Request

from ..posts.orm import purchase_wear


router = APIRouter(tags=['get users and  wear data and sending it to telegram bot'], prefix='/purchase')


@router.post('')
async def purchase(request_body: Request):
    wear_data = await request_body.json()
    await purchase_wear(wear_data)
