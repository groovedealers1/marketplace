import { Button, Modal, Form, Input } from "antd";
import React, {useState} from "react";
import axios from "axios";

import {InitialStateForAddWear} from "../models/ModelsForWear.js";


export default function ModalAddStuff() {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(InitialStateForAddWear)

    const {TextArea} = Input;


    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleOk = () => {
        axios(
            {
                method: 'post',
                url: 'http://localhost:8000/admin/insert_wear',
                data: data,
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }
        );
    };


    const uploadImages = (e) => {
        const fd = new FormData();
        fd.set('files', e.target.files[0], e.target.files[0].name)

        if (e.target.id === '1') {
            setData({...data, images_data: {...data.images_data, name_for_image_1: e.target.files[0].name}})
        } else if (e.target.id === '2') {
            setData({...data, images_data: {...data.images_data, name_for_image_2: e.target.files[0].name}})
        } else if (e.target.id === '3') {
            setData({...data, images_data: {...data.images_data, name_for_image_3: e.target.files[0].name}})
        }

        axios(
            {
                method: 'post',
                url: 'http://localhost:8000/admin/upload_images',
                data: fd,
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                }
            }

        )
    }

    return (
        <>
            <Button type="primary" onClick={showModal} style={{fontFamily: "monospace", backgroundColor: "green", width: "15em", height: "4em",
                                                                display: "block", margin: "auto"}}>
                Добавить товар
            </Button>
            <Modal
                name='customer-form'
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                className="modal-title"
                footer={
                    <center><Button
                        key="submit"
                        type="primary"
                        onClick={handleOk}
                        style={{
                            backgroundColor: 'black',
                            width: '17em',
                            height: "3.5em"
                        }}>
                        Добавить
                    </Button></center>
                }
            >
                <Form
                    layout='vertical'
                >
                    <Form.Item>
                        <p className="text-for-customer"> Название товара </p>
                        <Input onChange={e => setData({...data, product_data: {...data.product_data, name: e.target.value}})}/>
                    </Form.Item>

                    <Form.Item>
                        <p className="text-for-customer"> Цена </p>
                        <Input onChange={e => setData({...data, product_data: {...data.product_data, price: e.target.value}})}/>
                    </Form.Item>

                    <Form.Item>
                        <p className="text-for-customer"> Описание </p>
                        <TextArea rows={4} onChange={e => setData({...data, product_data: {...data.product_data, description: e.target.value}})}/>
                    </Form.Item>

                    <Form.Item>
                        <p className="text-for-customer"> Характеристики </p>
                        <TextArea rows={4} onChange={e => setData({...data, product_data: {...data.product_data, characteristics: e.target.value}})}/>
                    </Form.Item>

                    <Form.Item>
                        <p className="text-for-customer"> Цвет </p>
                        <Input onChange={e => setData({...data, product_data: {...data.product_data, colors: e.target.value}})}/>
                    </Form.Item>

                    <Form.Item>
                        <p className="text-for-customer"> Коллекция (не обязательно) </p>
                        <Input onChange={e => setData({...data, product_data: {...data.product_data, collection: e.target.value}})}/>
                    </Form.Item>

                    <Form.Item>
                        <p className="text-for-customer"> Скидка (не обязательно) </p>
                        <Input onChange={e => setData({...data, product_data: {...data.product_data, discount: e.target.value}})}/>
                    </Form.Item>

                    <Form.Item>
                        <p className="text-for-customer"> Размеры (max: 6)</p>
                        <Input placeholder='S, M, L ' onChange={e => setData({
                            ...data, sizes_data: {...data.sizes_data,
                                size_1: (e.target.value).split(', ')[0],
                                size_2: (e.target.value).split(', ')[1],
                                size_3: (e.target.value).split(', ')[2],
                                size_4: (e.target.value).split(', ')[3],
                                size_5: (e.target.value).split(', ')[4],
                                size_6: (e.target.value).split(', ')[5]
                        }
                        })}/>
                    </Form.Item>

                    <Form.Item>
                        <p className="text-for-customer"> Количество каждого размера </p>
                        <Input placeholder='10, 20, 30' onChange={e => setData({
                            ...data, quantities_data: {...data.quantities_data,
                                quantity_1: (e.target.value).split(', ')[0],
                                quantity_2: (e.target.value).split(', ')[1],
                                quantity_3: (e.target.value).split(', ')[2],
                                quantity_4: (e.target.value).split(', ')[3],
                                quantity_5: (e.target.value).split(', ')[4],
                                quantity_6: (e.target.value).split(', ')[5]
                            }})}/>
                    </Form.Item>

                    <Form.Item>
                        <p className="text-for-customer"> Изображения </p> <br/>
                        <input id='1' type='file' onChange={uploadImages}/> <br/>
                        <input id='2' type='file' onChange={uploadImages}/> <br/>
                        <input id='3' type='file' onChange={uploadImages}/> <br/>
                    </Form.Item>

                </Form>
            </Modal>
        </>
    )
}