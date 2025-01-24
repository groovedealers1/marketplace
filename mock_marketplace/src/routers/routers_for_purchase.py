from fastapi import APIRouter, Request

from ..tg_bot.telegram_bot import main


router = APIRouter(tags=['get users, wear data and sending it to telegram bot'], prefix='/purchase')


@router.post('')
async def purchase(data: Request):
    await main(await data.json())
    return 'success'
