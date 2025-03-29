import React from 'react';
import {useEffect, useState} from 'react'
import axios from "axios";
import ModalBuyStuff from "./ModalBuyStuff.jsx";
import { Segmented } from "antd";


export default function Card () {
    const wearId = document.location.href.split('/')[4]

    const [wear, setWears] = useState({images: {0: {name_for_image_1: '', name_for_image_2: '', name_for_image_3: ''}},
                                                   sizes: {0 :{size_1: 'S', size_2: 'M', size_3: 'L'}},
                                                   quantity: {0: {quantity_1: '', quantity_2: '', quantity_3: '', quantity_4: '', quantity_5: '', quantity_6: ''}}, })

    const quantities = [wear.quantity[0].quantity_1, wear.quantity[0].quantity_2, wear.quantity[0].quantity_3,
                                   wear.quantity[0].quantity_4, wear.quantity[0].quantity_5, wear.quantity[0].quantity_6].filter(Boolean)
    const sizes = [wear.sizes[0].size_1, wear.sizes[0].size_2, wear.sizes[0].size_3,
                              wear.sizes[0].size_4, wear.sizes[0].size_5, wear.sizes[0].size_6].filter(Boolean)

    const [numberOfQuantity, setNumber] = useState()
    const [modal, setModal] = useState(true)
    const [size, setSize] = useState(sizes[0])


    const getWear = () => {
        axios.get('http://localhost:8000/wears/' + wearId).then(r => {
            const stuff = r.data[0];
            const a = [...(Object.values(stuff.sizes[0])).slice(0, 4), ...(Object.values(stuff.sizes[0])).slice(6)].reduce((accumulator, currentValue) => accumulator + currentValue, 0,);

            if (a === 0) {
                setModal(false)
            }

            setWears(stuff);
        })
    }

    const handleSizeByDefault = (e) => {
        if (e === 'S') {
            return 'quantity_1'
        } else if (e === 'M') {
            return 'quantity_2'
        } else if (e === 'L') {
            return 'quantity_3'
        } else if (e === 'XL') {
            return 'quantity_4'
        } else if (e === 'XXL') {
            return 'quantity_5'
        }
    }

    const modalFunc = () => {
        if (modal === false) {
            let parentElem = document.getElementsByClassName('modal')
            parentElem.item(0).replaceWith("OUT OF STOCK")
        }
    }

    const handleSize = (e) => {
        setSize(e)
        if (e === 'S') {
            setNumber('quantity_1')
        } else if (e === 'M') {
            setNumber('quantity_2')
        } else if (e === 'L') {
            setNumber('quantity_3')
        } else if (e === 'XL') {
            setNumber('quantity_4')
        } else if (e === 'XXL') {
            setNumber('quantity_5')
        } else if (e === 'XXXL') {
            setNumber('quantity_6')
        }
    }


    document.title = wear.name;

    useEffect(() => {
        getWear();
        modalFunc();
    }, [modal]);


    return (

        <div className="bg-white">
            <div className="pt-6">

                {/* Image gallery */}

                 <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                    <div >
                         <img
                             alt='sorry we cant load the images'
                             src={'/images/' + wear.images[0].name_for_image_1}
                             className="wear-img"
                         />
                    </div>
                    <div>
                         <img
                             alt='sorry we cant load the images'
                             src={'/images/' + wear.images[0].name_for_image_2}
                             className="wear-img"
                         />
                    </div>
                    <div>
                         <img
                             alt='sorry we cant load the images'
                             src={'/images/' + wear.images[0].name_for_image_3}
                             className='wear-img'
                            />
                    </div>
                 </div>

                {/* Product info */}
                <div
                    className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">

                        <h1 className="name-of-wear">{wear.name}</h1>
                    </div>

                    {/* Options */}
                    <div className="mt-4 lg:row-span-3 lg:mt-0">

                        <p className="text-3xl tracking-tight text-gray-900">{wear.price} ₽</p>

                        <form className="mt-10">

                            {/* Color */}
                            <div className="flex items-center">
                                <h3 className="sizes-color" > Color:  </h3>
                                <h3 className="sizes-color"> {wear.colors} </h3>
                            </div>

                            {/* Sizes */}

                            <div className="mt-4">
                                <Segmented key={1} defaultValue={" "} options={sizes} onChange={handleSize}/>
                            </div><br/>


                            <div className='modal'>
                                <ModalBuyStuff className='modal-button'
                                               wear={{name: wear.name,
                                                   size: size,
                                                   price: wear.price,
                                                   id: wear.id,
                                                   image: wear.images[0].name_for_image_1,
                                                   quantity: quantities[sizes.indexOf(size)],
                                                   numberOfQuantity: handleSizeByDefault(size)}} />
                            </div>
                        </form>
                    </div>

                    <div
                        className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                        {/* Description and details */}
                        <div>
                            <h3 className="sr-only">Description</h3>

                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{wear.description}</p>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h2 className="text-sm font-medium text-gray-900">Details</h2>

                            <div className="mt-4 space-y-6">
                                <p className="text-sm text-gray-600">{wear.characteristics}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}