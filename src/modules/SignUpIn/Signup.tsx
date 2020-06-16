import React, { useState } from 'react'
import { Card, Row, Form, Input, Button, Col, Checkbox, Alert } from 'antd'
import { Link, navigate } from '@reach/router'
import {usernameRules, passwordRules, passwordRules2} from './formRules'
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
}
const Signup = (props) => {
    const [form] = Form.useForm()
    const [error, setError] = useState("")    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")

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
                    return navigate("/")
                } else {
                    return res.json()
                }
            }).then(data => {
                if (data) {
                    const {error} = data
                    if (error.code === 800) {
                        setError("Username was taken")
                    } else {
                        setError(error?.message)
                    }
                }
                
            })
        }
    }

    return (
            <Row justify="center" align="middle">
                <Col span={8}>
                    <Card>
                        <Form form={form} name="signup">
                            <Form.Item name="username" rules={usernameRules}
                                {...( error && { validateStatus: "error", help: error})}
                            >
                                <Input placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
                            </Form.Item>
                            <Form.Item name="password" rules={passwordRules}>
                                <Input.Password placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                            </Form.Item>
                            <Form.Item name="password2" rules={passwordRules2}>
                                <Input.Password placeholder="password" value={password2} onChange={e => setPassword2(e.target.value)} />
                            </Form.Item>
                            <Form.Item>
                                <Link to="/login">
                                    <Button type="link">I already had account</Button>
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
                                        } onClick={handleSignup}>Signup</Button>
                                )}
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>

            </Row>
    )
}
export default Signup