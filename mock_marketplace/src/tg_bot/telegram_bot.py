from aiogram import Bot

from config import settings


bot = Bot(token=settings.BOT_TOKEN)


async def main(channel_id: int, text: str):
    await bot.send_message(channel_id, text)


async def send_message(text: dict):
    await main(settings.CHANNEL_ID, f"""
name: {text['name']}
size: {text['size']}
quantity: {text['quantity']}
FIO: {text['fio']}
phone: {text['phone']}
email: {text['email']}

pick up location: {text['pickUpLocation']}
comment: {text['comment']}""")
