export const InitialStateForAddWear = {
    product_data: {
        name: null,
        price: null,
        description: null,
        characteristics: null,
        colors: null,
        collection: null,
        discount: null,
    },
    sizes_data: {
        size_1: null,
        size_2: null,
        size_3: null,
        size_4: null,
        size_5: null,
        size_6: null,
    },
    quantities_data: {
        quantity_1: null,
        quantity_2: null,
        quantity_3: null,
        quantity_4: null,
        quantity_5: null,
        quantity_6: null,

    },
    images_data: {
        name_for_image_1: null,
        name_for_image_2: null,
        name_for_image_3: null,
    }
};


export const InitialStateForEditWear = {}


export const InitialStateForGetWear = {
  characteristics: "",
  price: null,
  discount: null,
  name: null,
  id: null,
  description: null,
  colors: null,
  collection: null,
  quantities: [
    {
      product_id: null,
      id: null,
      quantity_3: null,
      quantity_5: null,
      quantity_2: null,
      quantity_1: null,
      quantity_4: null,
      quantity_6: null
    }
  ],
  images: [
    {
      id: null,
      name_for_image_2: null,
      product_id: null,
      name_for_image_1: null,
      name_for_image_3: null
    }
  ],
  sizes: [
      {
          product_id: null,
          id: null,
          size_3: null,
          size_5: null,
          size_6: null,
          size_2: null,
          size_1: null,
          size_4: null
      }
  ]
};


export const InitialStateForBuyWear = {
  quantity: 1,
  price: null,
  fio: null,
  phone: null,
  email: null,
  pickUpLocation: null,
  comment: null,
};
