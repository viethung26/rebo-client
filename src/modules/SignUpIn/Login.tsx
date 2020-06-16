import React, {useState, useEffect } from 'react'
import { Card, Row, Form, Input, Button, Col, Checkbox } from 'antd'
import { Link, navigate } from '@reach/router'
import { usernameRules, passwordRules } from './formRules'
import { useRecoilValue } from 'recoil'
import { activeUserState } from 'stores'
import {io} from '../../sockets'

const Login = (props) => {
	const activeUser = useRecoilValue(activeUserState)
    
    const [form] = Form.useForm()
    const [error, setError] = useState("")
    useEffect(() => {
        if (activeUser) {
            navigate("/")
        }
    })
    const handleLogin = () => {
        if (form.isFieldsTouched(["username", "password", "password2"], true)) {
            const username = form.getFieldValue('username')
            const password = form.getFieldValue('password')
            fetch("/api/v1/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            }).then(res => {
                console.info('9779 res', res)
                const {status} = res
                if (status === 200) {
                    console.info('9779 io', io.connected)
                    if (!io.connected) {
                        io.connect()
                    }
                    return navigate("/")
                } else {
                    return res.json()
                }
            }).then(data => {
                if (data) {
                    const {error} = data
                    setError(error?.message)
                }
                
            })
        }
    }
   
    return (
        <Row justify="center" align="middle">
            <Col span={8}>
                <Card>
                    <Form form={form} name="login">
                        <Form.Item name="username" rules={usernameRules}>
                            <Input placeholder="username" />
                        </Form.Item>
                        <Form.Item name="password" rules={passwordRules}
                            {...( error && { validateStatus: "error",
                            help: error})}
                        >
                            <Input.Password placeholder="password" />
                        </Form.Item>
                        <Form.Item>
                            <Checkbox>Remember me</Checkbox>
                            <Link to="/signup">
                                <Button type="link">I don't have account</Button>
                            </Link>
                        </Form.Item>
                        <Form.Item shouldUpdate={true}>
                            {() => (
                            <Button
                                htmlType="submit"
                                type="primary"
                                disabled={
                                    !form.isFieldsTouched(["username", "password"], true) ||
                                    form.getFieldsError().filter(({ errors }) => errors.length).length > 0
                                } onClick={handleLogin}>Login</Button>
                            )}
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}
export default Login