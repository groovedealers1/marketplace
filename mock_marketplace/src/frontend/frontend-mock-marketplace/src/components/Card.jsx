import React from 'react';
import {useEffect, useState} from 'react'
import axios from "axios";
import { Segmented } from "antd";

import ModalBuyStuff from "./ModalBuyStuff.jsx";
import {InitialStateForGetWear} from "../models/ModelsForWear.js";

export default function Card () {
    const wearId = document.location.href.split('/')[4]

    const [wear, setWear] = useState(InitialStateForGetWear)

    const [size, setSize] = useState()
    const [numberOfQuantity, setNumber] = useState()
    const [quantity, setQuantity] = useState()


    const getWear = () => {
        axios.get('http://localhost:8000/wears/' + wearId).then(r => {
            if (Object.values(r.data.sizes[0]).every(x => x === null) === true) {
                modalCloseFunc();
            }
            setWear(r.data);
        })
            .then(showPage)
    }


    const modalCloseFunc = () => {
        let parentElem = document.getElementsByClassName('modal');
        if (parentElem.length !== 0) {
            parentElem.item(0).replaceWith("OUT OF STOCK");
        }
    }

    const handleSize = (e) => {
        const number = 'quantity_' + (Object.values(wear.sizes[0]).indexOf(e) + 1)

        setSize(e)
        setNumber(number)
        setQuantity(wear.quantities[0][number])
    }

    const showPage = () => {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('card-div').style.display = 'block';
    }


    useEffect(() => {
        getWear();
        document.title = wear.name
    }, [wear.name]);


    return (

        <div className="bg-white">

            <div id='loader'></div>

            <div id='card-div' style={{display: 'none'}} className='animate-bottom'>

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
                            <div>
                                <h3>{wear.colors}</h3>
                            </div>

                            {/* Sizes */}

                            <div className="mt-4">
                                <Segmented key={1} defaultValue={Object.values(wear.sizes[0]).filter(Boolean)[0]} options={Object.values(wear.sizes[0]).filter(Boolean)} onChange={handleSize}/>
                            </div><br/>


                            <div className='modal'>
                                <ModalBuyStuff className='modal-button'
                                               wear={{name: wear.name,
                                                   size: size,
                                                   price: wear.price,
                                                   id: wear.id,
                                                   image: wear.images[0].name_for_image_1,

                                                   quantity: quantity,
                                                   numberOfQuantity: numberOfQuantity
                                }}
                                />
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
                            <div className="mt-4 space-y-6">
                                <p className="text-sm text-gray-600">{wear.characteristics}</p>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}