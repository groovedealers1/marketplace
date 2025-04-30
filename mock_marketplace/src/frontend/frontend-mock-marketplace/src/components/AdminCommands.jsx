import ModalAddStuff from "./ModalAddStuff";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import ModalDeleteStuff from "./ModalDeleteStuff.jsx";

export default function AdminCommands() {

    const navigate = useNavigate();

    useEffect(() => {
        if ('admin' !== document.cookie.split("=")[0]) {

            document.getElementById('admin').style.display = "none";

            alert("у вас нет доступа к этой странице");
            navigate('/');
        }
    },);

    return (
        <>
            <div id='admin'>

                <div className='text-4xl font-serif font-bold pl-96 pt-20'>
                    <h1>Панель администратора</h1>
                </div>


                <div className='pt-14 pr-96'>
                    <ModalAddStuff/>
                </div>

                <div className='pt-14 pr-96'>
                    <ModalDeleteStuff/>
                </div>

            </div>
        </>
    )
}
