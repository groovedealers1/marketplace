"""TABLES USER PRODUCT IMAGE SIZE

Revision ID: 13b72870825f
Revises: 72ccacae46a6
Create Date: 2025-02-08 12:22:49.927804

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '13b72870825f'
down_revision: Union[str, None] = '72ccacae46a6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('image',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name_for_image_1', sa.String(), nullable=False),
    sa.Column('name_for_image_2', sa.String(), nullable=False),
    sa.Column('name_for_image_3', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('product',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('characteristics', sa.String(), nullable=False),
    sa.Column('colors', sa.String(), nullable=False),
    sa.Column('price', sa.Integer(), nullable=False),
    sa.Column('collection', sa.String(), nullable=True),
    sa.Column('discount', sa.Integer(), nullable=True),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('size',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('size_1', sa.String(), nullable=False),
    sa.Column('size_2', sa.String(), nullable=False),
    sa.Column('size_3', sa.String(), nullable=False),
    sa.Column('size_4', sa.String(), nullable=False),
    sa.Column('size_5', sa.String(), nullable=False),
    sa.Column('size_6', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=320), nullable=False),
    sa.Column('hashed_password', sa.String(length=1024), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('is_superuser', sa.Boolean(), nullable=False),
    sa.Column('is_verified', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_user_email'), 'user', ['email'], unique=True)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_user_email'), table_name='user')
    op.drop_table('user')
    op.drop_table('size')
    op.drop_table('product')
    op.drop_table('image')
    # ### end Alembic commands ###
