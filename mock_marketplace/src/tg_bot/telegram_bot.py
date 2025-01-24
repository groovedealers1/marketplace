from aiogram import Bot

from config import settings


bot = Bot(token=settings.BOT_TOKEN)


async def send_message(channel_id: int, text: str):
    await bot.send_message(channel_id, text)


async def main(text: dict):
    await send_message(settings.CHANNEL_ID, f"""Zакаz\n
name: {text['name']}
quantity: {text['quantity']}
FIO: {text['fio']}
phone: {text['phone']}
email: {text['email']}

pick up location: {text['pickUpLocation']}
comment: {text['comment']}""")

