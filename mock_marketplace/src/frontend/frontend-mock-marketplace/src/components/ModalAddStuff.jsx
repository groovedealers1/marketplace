import { Button, Modal, Form, Input, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, {useState} from "react";
import axios from "axios";

import InitialState from "./modelOfData";

export default function ModalAddStuff() {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const [data, setData] = useState(InitialState)


    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleOk = () => {
        setLoading(true);
    };


    const uploadImages = (e) => {
        const fd = new FormData();
        fd.append(e.target.files[0], e.target.files[0].name)

        console.log(e.target.files[0]);

        axios(
            {
                method: 'post',
                url: 'http://localhost:8000/admin/upload_images',
                data: fd,
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'image/jpeg',
                }
            }

        )
    }

    return (
        <>
            <Button type="primary" onClick={showModal} style={{backgroundColor: "green", width: "15em", height: "4em",
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
                        loading={loading}
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
                        <Input onChange={e => setData({...data, name: e.target.value})}/>
                    </Form.Item>

                    <Form.Item>
                        <p className="text-for-customer"> Цена </p>
                        <Input onChange={e => setData({...data, price: e.target.value})}/>
                    </Form.Item>

                    <Form.Item>
                        <p className="text-for-customer"> Описание </p>
                        <Input onChange={e => setData({...data, description: e.target.value})}/>
                    </Form.Item>

                    <Form.Item>
                        <p className="text-for-customer"> Характеристики </p>
                        <Input onChange={e => setData({...data, characteristics: e.target.value})}/>
                    </Form.Item>

                    <Form.Item>
                        <p className="text-for-customer"> Цвет </p>
                        <Input onChange={e => setData({...data, color: e.target.value})}/>
                    </Form.Item>

                    <Form.Item>
                        <p className="text-for-customer"> Коллекция (не обязательно) </p>
                        <Input onChange={e => setData({...data, collection: e.target.value})}/>
                    </Form.Item>

                    <Form.Item>
                        <p className="text-for-customer"> Скидка (не обязательно) </p>
                        <Input onChange={e => setData({...data, discount: e.target.value})}/>
                    </Form.Item>

                    <Form.Item>
                        <p className="text-for-customer"> Размеры (max: 6)</p>
                        <Input placeholder='S, M, L ' onChange={e => setData({...data,  size_1: (e.target.value).split(', ')[0],
                                                                       size_2: (e.target.value).split(', ')[1],
                                                                       size_3: (e.target.value).split(', ')[2],
                                                                       size_4: (e.target.value).split(', ')[3],
                                                                       size_5: (e.target.value).split(', ')[4],
                                                                       size_6: (e.target.value).split(', ')[5]})}/>
                    </Form.Item>

                    <Form.Item>
                        <p className="text-for-customer"> Количество каждого размера </p>
                        <Input placeholder='10, 20, 30' onChange={e => setData({...data,  quantity_1: parseInt((e.target.value).split(', ')[0]),
                                                                       quantity_2: parseInt((e.target.value).split(', ')[1]),
                                                                       quantity_3: parseInt((e.target.value).split(', ')[2]),
                                                                       quantity_4: parseInt((e.target.value).split(', ')[3]),
                                                                       quantity_5: parseInt((e.target.value).split(', ')[4]),
                                                                       quantity_6: parseInt((e.target.value).split(', ')[5])})}/>
                    </Form.Item>

                    <Form.Item>
                        <p className="text-for-customer"> Изображения </p>
                            <input type='file' onChange={uploadImages}/>
                        {/*<Upload action={e => uploadImages(e)} listType='picture-card'>*/}
                        {/*    <button*/}
                        {/*        style={{color: 'inherit', cursor: 'inherit', border: 0, background: 'none'}}*/}
                        {/*        type="button"*/}
                        {/*    >*/}
                        {/*        <PlusOutlined/>*/}
                        {/*        <div style={{marginTop: 8}}>Upload</div>*/}
                        {/*    </button>*/}
                        {/*</Upload>*/}
                    </Form.Item>

                </Form>
            </Modal>
        </>
    )
}