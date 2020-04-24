import React from 'react'
import styled from 'styled-components'
import {Card, Row, Form, Input, Button, Layout, Col, Checkbox} from 'antd'
import { Link } from '@reach/router'
const Signup = (props) => {
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
    }
    return (
        <StyledSignup>
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
                                <Input.Password placeholder="password"/>
                            </Form.Item>
                            <Form.Item>
                                <Link to="/login">
                                    <Button type="link">I already had account</Button>
                                </Link>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary">Signup</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
                
            </Row>
        </StyledSignup>
    )
}
export default Signup

const StyledSignup = styled.div`
`