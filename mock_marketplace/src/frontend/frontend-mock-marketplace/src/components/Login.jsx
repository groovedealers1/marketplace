import {useState} from "react";
import axios from "axios";
import {Input, Button} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons"
import {useNavigate} from "react-router-dom";

import InitialState from "../models/ModelsForAdminData.js"

export default function Login() {
    const [data, setData] = useState(InitialState)
    const navigate = useNavigate()

    const makeCookie = (token) => {
        let date = new Date();
        date.setTime(date.getTime() + (60 * 1000 * 60));
        let expires = "; expires=" + date.toUTCString();

        document.cookie = "admin=" + token + expires + "; path=/";
        navigate('/admin-commands')
    }

    const handleSubmit = () => {

        axios({
            method: 'post',
            url: 'http://0.0.0.0:8000/auth/jwt/login',
            data: data,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).catch(error => {if (error.status === 400 || 400) {alert('Неверный логин или пароль')}})
            .then(res => {makeCookie(res.data.access_token )});
    }

    return (
        <div>
            <Input className={'login-input'} size={'large'} placeholder={'email'} prefix={<UserOutlined/>}
                   onChange={e => setData({...data, username: e.target.value})}/>

            <Input className={'login-input'} size={'large'} placeholder={'password'} prefix={<LockOutlined/>}
                   onChange={e => setData({...data, password: e.target.value})}/>

            <Button className={'login-input'} onClick={handleSubmit} > Login </Button>
        </div>
    )
}
