from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase, relationship
from .database import intpk, str_256, str_1024


class Base(DeclarativeBase): pass


class Products(Base):
    __tablename__ = 'product'

    id: Mapped[intpk]

    name: Mapped[str_256] = mapped_column(nullable=False)
    description: Mapped[str_256] = mapped_column(nullable=False)
    characteristics: Mapped[str_1024] = mapped_column(nullable=False)
    colors: Mapped[str_256] = mapped_column(nullable=False)
    price: Mapped[int] = mapped_column(nullable=False)
    collection: Mapped[str_256 | None]
    discount: Mapped[int | None]

    images: Mapped[list["Images"]] = relationship("Images", cascade="all, delete", back_populates="product")
    sizes: Mapped[list["Sizes"]] = relationship("Sizes", cascade="all, delete", back_populates="product")
    quantity: Mapped[list["Quantity"]] = relationship("Quantity", cascade="all, delete",  back_populates="product")


class Images(Base):
    __tablename__ = 'image'

    id: Mapped[intpk]
    product: Mapped["Products"] = relationship(back_populates="images")
    product_id: Mapped[int] = mapped_column(ForeignKey('product.id'))

    name_for_image_1: Mapped[str_256] = mapped_column(nullable=False)
    name_for_image_2: Mapped[str_256] = mapped_column(nullable=False)
    name_for_image_3: Mapped[str_256] = mapped_column(nullable=False)


class Sizes(Base):
    __tablename__ = 'size'

    id: Mapped[intpk]
    product: Mapped["Products"] = relationship(back_populates="sizes")
    product_id: Mapped[int] = mapped_column(ForeignKey('product.id'))

    size_1: Mapped[str_256 | None]
    size_2: Mapped[str_256 | None]
    size_3: Mapped[str_256 | None]
    size_4: Mapped[str_256 | None]
    size_5: Mapped[str_256 | None]
    size_6: Mapped[str_256 | None]


class Quantity(Base):
    __tablename__ = 'quantity'

    id: Mapped[intpk]
    product: Mapped["Products"] = relationship(back_populates="quantity")
    product_id: Mapped[int] = mapped_column(ForeignKey('product.id'))

    quantity_1: Mapped[int | None]
    quantity_2: Mapped[int | None]
    quantity_3: Mapped[int | None]
    quantity_4: Mapped[int | None]
    quantity_5: Mapped[int | None]
    quantity_6: Mapped[int | None]
