from pydantic import BaseModel, ConfigDict, Field


class ImagesModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    name_for_image_1: str
    name_for_image_2: str
    name_for_image_3: str


class QuantityModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    quantity_1: int | None = Field(default=0)
    quantity_2: int | None = Field(default=0)
    quantity_3: int | None = Field(default=0)
    quantity_4: int | None = Field(default=0)
    quantity_5: int | None = Field(default=0)
    quantity_6: int | None = Field(default=0)


class SizeModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    size_1: str | None = Field(default=None)
    size_2: str | None = Field(default=None)
    size_3: str | None = Field(default=None)
    size_4: str | None = Field(default=None)
    size_5: str | None = Field(default=None)
    size_6: str | None = Field(default=None)


class ProductModelBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    name: str
    description: str
    characteristics: str
    colors: str
    price: int
    collection: str | None = Field(default=None)
    discount: int | None = Field(default=None)


class ProductModelGET(ProductModelBase):
    model_config = ConfigDict(from_attributes=True)

    id: int

    images: list[ImagesModel]
    sizes: list[SizeModel]
    quantities: list[QuantityModel]


class ProductModelPurchase(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int

    name: str
    size: str
    quantity: int
    number_of_quantity: str
    fio: str
    phone: str
    email: str
    pick_up_location: str
    comment: str


class ProductModelDELETE(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    wear_id: int
    wear_name: str
