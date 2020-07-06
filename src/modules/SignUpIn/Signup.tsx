import React, { useState } from 'react'
import { Card, Row, Form, Input, Button, Col, Checkbox, Alert, Typography } from 'antd'
import { Link, navigate } from '@reach/router'
import {usernameRules, passwordRules, passwordRules2} from './formRules'
import getErrorMessage from 'ErrorMessage'
import { useRecoilState } from 'recoil'
import { activeUserState } from 'stores'
import {io} from '../../sockets'

const {Title, Text} = Typography

const Signup = (props) => {
    const [form] = Form.useForm()
    const [error, setError] = useState("")    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
	const [activeUser, setActiveUser] = useRecoilState(activeUserState)


    const handleSignup = () => {
        if (form.isFieldsTouched(["username", "password", "password2"], true)) {
            fetch("/api/v1/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            }).then(res => {
                const {status} = res
                if (status === 200) {
                    if (!io.connected) {
                        io.connect()
                    }
                } 
                return res.json()
            }).then(data => {
                if (data?.error) {
                    const {error} = data
                    if (error.code === 800) {
                        setError("Tên người dùng đã tồn tại")
                    } else {
                        setError(getErrorMessage(error?.code))
                    }
                } else {
                    setActiveUser(data)
                    return navigate("/")
                }
                
            })
        }
    }

    return (
            <Row justify="center" align="middle" style={{height: '100%'}}>
                <Col span={8}>
                    <Card>
                        <Title>Đăng ký</Title>
                        <Form form={form} name="signup">
                            <Form.Item name="username" rules={usernameRules}
                                {...( error && { validateStatus: "error", help: error})}
                            >
                                <Input placeholder="Tên người dùng" value={username} onChange={e => setUsername(e.target.value)} />
                            </Form.Item>
                            <Form.Item name="password" rules={passwordRules}>
                                <Input.Password placeholder="Mật khẩu" value={password} onChange={e => setPassword(e.target.value)} />
                            </Form.Item>
                            <Form.Item name="password2" rules={passwordRules2}>
                                <Input.Password placeholder="Nhập lại mật khẩu" value={password2} onChange={e => setPassword2(e.target.value)} />
                            </Form.Item>
                            <Form.Item>
                                <Link to="/login">
                                    <Button type="link">Tôi đã có tài khoản</Button>
                                </Link>
                            </Form.Item>
                            <Form.Item shouldUpdate={true}>
                                {() => (
                                    <Button
                                        htmlType="submit"
                                        type="primary"
                                        disabled={
                                            !form.isFieldsTouched(["username", "password", "password2"], true) ||
                                            form.getFieldsError().filter(({ errors }) => errors.length).length > 0
                                        } onClick={handleSignup}>Đăng ký</Button>
                                )}
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>

            </Row>
    )
}
export default Signup