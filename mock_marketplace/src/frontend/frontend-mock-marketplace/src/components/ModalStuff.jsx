import React, {useEffect, useState} from 'react';
import { Button, Modal} from 'antd';
import {
    Form,
    Input,
    Select
} from 'antd';
import axios from "axios";


const ModalStuff = ({ wear }) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(wear.price);
    const [fio, setFio] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const [pickUpLocation, setPickUpLocation] = useState('...');
    const [comment, setComment] = useState('');

    const handleFioChange = (e) => {
        setFio(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePickUpLocationChange = (e) => {
        setPickUpLocation(e.target.value);
    }

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    }

    const check_for_plus = () => {
        if (quantity + 1 > wear.quantity) {
            return setQuantity(wear.quantity);
        } else {
            return setQuantity(quantity + 1);
        }
    };

    const check_for_minus = () => {
        if (quantity - 1 <= 0) {
            return 1;
        } else {
            return setQuantity(quantity - 1);
        }
    };

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        const purchase = () => {
            axios.post('http://127.0.0.1:8000/purchase', {name: wear.name,
                                                                    quantity: quantity,
                                                                    fio: fio,
                                                                    phone: phone,
                                                                    email: email,
                                                                    pickUpLocation: pickUpLocation,
                                                                    comment: comment});
        }
        purchase();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 2000);
        setQuantity(1);
    };

    const handleCancel = () => {
        setOpen(false);
        setQuantity(1);
    };

    useEffect(() => {
            setPrice(wear.price * quantity)
    }, [quantity])

    return (
        <>
            <Button type="primary" onClick={showModal} style={{backgroundColor: "black", width: "15em", height: "4em"}} >
                Купить
            </Button>
            <Modal
                name='customer-form'
                open={open}
                title="Your order:"
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
                        Оформить заказ
                    </Button></center>
                }
            >
            <div className="wear">
                <div className="create-line"></div>
                <div>
                    <h1 className="name-of-wear-in-modal">{wear.name}</h1>
                </div>

                <table>
                    <tbody><tr>
                        <th rowSpan="3"><img className='image-in-modal' alt='sorry we cant load the image (((' src={'/images/' + wear.images.name_for_image_1}/></th>
                    </tr>
                    <tr>
                        <th><p className="properties-of-wear-in-modal">{price || wear.price} ₽</p></th>
                    </tr>
                    <tr>
                        <th className='properties-of-wear-in-modal'>
                            <button className='button-plus-in-modal' onClick={() => check_for_plus()} type='button'>
                                +
                            </button>
                            <p style={{display: "inline"}}>{quantity}</p>
                            <button className='button-minus-in-modal' onClick={() => check_for_minus()} style={{display: "inline"}} type='button'>{/*setQuantity(quantity - 1)*/}
                                -
                            </button>
                        </th>
                    </tr>
                    </tbody>
                </table>

                <div className="create-line"></div>
            </div>
            <div className="customer-data">
                <Form
                    labelCol={{span: 4}}
                    wrapperCol={{span: 14}}
                    layout='vertical'
                    style={{maxWidth: 900}}
                >
                    <Form.Item>
                        <p className="text-for-customer">ФИО</p>
                        <Input className='customer-data-inputs' onChange={handleFioChange} />
                    </Form.Item>
                    <Form.Item>
                        <p className="text-for-customer">Ваш телефон</p>
                        <Input className='customer-data-inputs' onChange={handlePhoneChange}/>
                    </Form.Item>
                    <Form.Item style={{marginBottom: 50}}>
                        <p className="text-for-customer">Ваш Email</p>
                        <Input className='customer-data-inputs' onChange={handleEmailChange}/>
                    </Form.Item>
                    <p style={{
                        fontWeight: "bold",
                        fontSize: 25,
                        fontFamily: "monospace",
                        marginBottom: 20
                    }}>Delivery</p>
                        <p className="text-for-customer">City: Южно-Сахалинск</p><br></br>

                    <Form.Item>
                        <p className="text-for-customer">Pickup location</p>
                        <select className='select' onChange={handlePickUpLocationChange}>
                            <option value='none'>choose pickup location</option>
                            <option value='комсомольская 153'>комсомольская 153</option>
                            <option value='Мира 306'>Мира 306</option>
                            <option value='Ленина 232'>Ленина 232</option>
                            <option value='Институтская 15'>Институтская 15</option>
                            <option value='Авиационная 4'>Авиационная 4</option>
                            <option value='ш. Холмское 5/1б'>ш. Холмское 5/1б</option>
                            <option value='Ленина 196'>Ленина 196</option>
                            <option value='Пограничная 19А'>Пограничная 19А</option>
                            <option value='Есенина 44'>Есенина 44</option>
                            <option value='Чехова 60'>Чехова 60</option>
                        </select>
                    </Form.Item>
                    <Form.Item>
                        <p className="text-for-customer">Comment</p>
                        <Input className='customer-data-inputs' onChange={handleCommentChange}/>
                    </Form.Item>
                </Form>
            </div>
            </Modal>
        </>
    );
};

export default ModalStuff;