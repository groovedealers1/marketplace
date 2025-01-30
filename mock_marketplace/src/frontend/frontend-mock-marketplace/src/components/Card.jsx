'use client'
import React from 'react';
import {useEffect, useState} from 'react'
import axios from "axios";
import ModalStuff from "./ModalStuff.jsx";


export default function Card () {
    const wearId = document.location.href.split('/')[4]

    const [wear, setWears] = useState({images: {name_for_image_1: '', name_for_image_2: '', name_for_image_3: ''}});

    const getWear = () => {
        axios.get('http://localhost:8000/wears/' + wearId).then(r => {
            const stuff = r.data;
            setWears(stuff);
        })
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
                            src={'/images/' + wear.images.name_for_image_1}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                    <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                        <img
                            alt='sorry we cant load the images'
                            src={'/images/' + wear.images.name_for_image_2}
                        />
                    </div>
                    <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                        <img
                            alt='sorry we cant load the images'
                            src={'/images/' + wear.images.name_for_image_3}
                        />
                    </div>
                </div>

                {/* Product info */}
                <div
                    className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">

                        <h1 className="name-of-wear">{wear.name}</h1> {/*text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl*/}
                    </div>

                    {/* Options */}
                    <div className="mt-4 lg:row-span-3 lg:mt-0">

                        <p className="text-3xl tracking-tight text-gray-900">{wear.price} ₽</p>

                        <form className="mt-10">

                            <h3 className="text-sm font-medium text-gray-900" style={{display: "inline"}}> Color: </h3>
                            <h3 className="text-sm font-medium text-gray-900"
                                style={{color: wear.colors, display: "inline"}}> {wear.colors} </h3>

                            {/* Sizes */}
                            <h1 className="text-base font-medium text-gray-900">Size: XL </h1><br/>

                            <ModalStuff wear={wear}/>
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

