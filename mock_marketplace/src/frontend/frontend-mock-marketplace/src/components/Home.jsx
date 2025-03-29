import axios from "axios";
import {useEffect, useState} from "react";
import {Button} from "antd";


export default function Home() {

    const [wears, setWears] = useState([]);

    const getAllWears = () => {
        axios.get('http://localhost:8000/wears').then(r => {
            const allWears = r.data;
            setWears(allWears);
        })
    }

    useEffect(() => {
        getAllWears();
    }, []);

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <Button className={'login-button'} href={'/login'}> Войти </Button>
                <center><h2 className="text-2xl font-bold tracking-tight text-gray-900">Каталог</h2></center>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {Object.values(wears).map((wear) =>
                        <div key={wear.id} className="group relative">
                            <div
                                className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    alt='sorry we cant load the image'
                                    src={'./images/' + wear.images[0].name_for_image_1}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <a href={'wear/' + wear.id}>
                                            <span aria-hidden="true" className="absolute inset-0"/>
                                            {wear.name}
                                        </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{wear.colors}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">{wear.price} ₽</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}