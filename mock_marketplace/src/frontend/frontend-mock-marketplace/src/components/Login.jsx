import {useState} from "react";
import axios from "axios";
import {Input, Button} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons"
import {useNavigate} from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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
            data: {username: email, password: password},
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => {if (res.status === 200) {makeCookie(res.data.access_token)}})
    }

    return (
        <div>
            <Input className={'login-input'} size={'large'} placeholder={'email'} prefix={<UserOutlined/>}
                   onChange={e => setEmail(e.target.value)}/>

            <Input className={'login-input'} size={'large'} placeholder={'password'} prefix={<LockOutlined/>}
                   onChange={e => setPassword(e.target.value)}/>

            <Button className={'login-input'} onClick={handleSubmit}> Login </Button>
        </div>
    )
}
