from fastapi import APIRouter, Request

from ..tg_bot.telegram_bot import send_message


router = APIRouter(tags=['get users and  wear data and sending it to telegram bot'], prefix='/purchase')


@router.post('')
async def purchase(data: Request):
    await send_message(await data.json())
    return 'success'
