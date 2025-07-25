"""BASE REVISION

Revision ID: 7a9b56bc8e44
Revises: c09643eb74e2
Create Date: 2025-04-03 15:59:15.243389

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '7a9b56bc8e44'
down_revision: Union[str, None] = 'c09643eb74e2'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('product',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('characteristics', sa.String(), nullable=False),
    sa.Column('colors', sa.String(), nullable=False),
    sa.Column('price', sa.Integer(), nullable=False),
    sa.Column('collection', sa.String(), nullable=True),
    sa.Column('discount', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('image',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.Column('name_for_image_1', sa.String(), nullable=False),
    sa.Column('name_for_image_2', sa.String(), nullable=False),
    sa.Column('name_for_image_3', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['product_id'], ['product.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('quantity',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.Column('quantity_1', sa.Integer(), nullable=True),
    sa.Column('quantity_2', sa.Integer(), nullable=True),
    sa.Column('quantity_3', sa.Integer(), nullable=True),
    sa.Column('quantity_4', sa.Integer(), nullable=True),
    sa.Column('quantity_5', sa.Integer(), nullable=True),
    sa.Column('quantity_6', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['product_id'], ['product.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('size',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.Column('size_1', sa.String(), nullable=True),
    sa.Column('size_2', sa.String(), nullable=True),
    sa.Column('size_3', sa.String(), nullable=True),
    sa.Column('size_4', sa.String(), nullable=True),
    sa.Column('size_5', sa.String(), nullable=True),
    sa.Column('size_6', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['product_id'], ['product.id'], ),
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
    op.drop_table('quantity')
    op.drop_table('image')
    op.drop_table('product')
    # ### end Alembic commands ###
