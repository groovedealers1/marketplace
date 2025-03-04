'use client'
import React from 'react';
import {useEffect, useState} from 'react'
import axios from "axios";
import ModalStuff from "./ModalStuff.jsx";
import { Segmented } from "antd";


export default function Card () {
    const wearId = document.location.href.split('/')[4]

    const [wear, setWears] = useState({images: {0: {name_for_image_1: '', name_for_image_2: '', name_for_image_3: ''}},
                                                                       sizes: {0 :{size_1: '', size_2: '', size_3: ''}}, });
    const [size, setSize] = useState()
    const [quantity, setQuantity] = useState(10)

    const sizes = [wear.sizes[0].size_1, wear.sizes[0].size_2, wear.sizes[0].size_3,
                          wear.sizes[0].size_4, wear.sizes[0].size_5, wear.sizes[0].size_6].filter(Boolean)


    const getWear = () => {
        axios.get('http://localhost:8000/wears/' + wearId).then(r => {
            const stuff = r.data[0];
            setWears(stuff);
        })
    }

    const handleSize = (e) => {
        setSize(e)
        const a = sizes.indexOf(e)
        setQuantity(wear.quantity[0]['quantity_' + (a + 1)])
    }


    document.title = wear.name;

    useEffect(() => {
        getWear()
    }, []);


    return (
        <div className="bg-white">
            <div className="pt-6">

                {/* Image gallery */}

                 <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                    <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                         <img
                             alt='sorry we cant load the images'
                             src={'/images/' + wear.images[0].name_for_image_1}
                             className="h-full w-full object-cover object-center"
                         />
                    </div>
                    <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                         <img
                             alt='sorry we cant load the images'
                             src={'/images/' + wear.images[0].name_for_image_2}
                         />
                    </div>
                    <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                         <img
                             alt='sorry we cant load the images'
                             src={'/images/' + wear.images[0].name_for_image_3}
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
                                <Segmented key={1} defaultValue={"L"} options={sizes} onChange={handleSize}/>
                            </div><br/>

                            <ModalStuff wear={ {name: wear.name, size: size, price: wear.price, id: wear.id,
                                                image: wear.images[0].name_for_image_1, quantity: quantity} }/>
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

