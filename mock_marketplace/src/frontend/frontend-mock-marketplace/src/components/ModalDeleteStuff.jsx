import {Button, Form, Input, Modal, Popconfirm} from "antd";
import React, {useState} from "react";
import axios from "axios";


export default function ModalDeleteStuff() {
    const [open, setOpen] = useState(false);
    const [id, setId] = useState()
    const [name, setName] = useState()


    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);

    };

    const handleOk = () => {
        console.log(id, name)

        axios(
                {
                    method: 'delete',
                    url: 'http://localhost:8000/admin/delete_wear',
                    data: {wear_id: id, wear_name: name},
                    headers: {
                        'accept': 'application/json'
                    }
                }
        )
    }

    return (
        <>
            <div>
                <Button type="primary" onClick={showModal} style={{fontFamily: "monospace", backgroundColor: "darkred" , width: "15em", height: "4em",
                                                                    display: "block", margin: "auto"}}>
                    Удалить товар
                </Button>
            </div>
                <Modal
                    name='customer-form'
                    open={open}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    className="modal-title"
                    footer={
                        <center>
                            <Popconfirm
                              title="ВНИМАНИЕ"
                              description="Вы уверены что хотите удалить этот товар?"
                              onConfirm={handleOk}
                            >
                              <Button type="primary" style={{fontFamily: "monospace", backgroundColor: "darkred"}}>Удалить</Button>
                            </Popconfirm>
                        </center>
                    }
                    >
                    <Form
                    layout='vertical'
                    >
                        <Form.Item>
                            <p className="text-for-customer"> ID товара </p>
                            <Input onChange={e => setId(e.target.value)}/>
                        </Form.Item>

                        <Form.Item>
                            <p className="text-for-customer"> Название товара </p>
                            <Input onChange={e => setName(e.target.value)}/>
                        </Form.Item>
                    </Form>

                </Modal>
        </>
    )
}
