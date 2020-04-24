import React from 'react'
import styled from 'styled-components'
import {Card, Row, Form, Input, Button, Layout, Col, Checkbox} from 'antd'
import { Link } from '@reach/router'
const Login = (props) => {
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
    }
    return (
        <StyledLogin>
            <Row justify="center" align="middle">
                <Col span={8}>
                    <Card>
                        <Form>
                            <Form.Item>
                                <Input placeholder="username"/>
                            </Form.Item>
                            <Form.Item>
                                <Input.Password placeholder="password"/>
                            </Form.Item>
                            <Form.Item>
                                <Checkbox>Remember me</Checkbox>
                                <Link to="/signup">
                                    <Button type="link">I don't have account</Button>
                                </Link>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary">Login</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
                
            </Row>
        </StyledLogin>
    )
}
export default Login

const StyledLogin = styled.div`
`