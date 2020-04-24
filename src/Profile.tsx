import React from 'react'
import styled from 'styled-components'
import { Avatar, Typography, Card, Button, Row, Col } from 'antd'
import {QqOutlined} from '@ant-design/icons'
import Article from '@c/Article'

const {Title, Text} = Typography
const Profile = (props) => {
    return (
        <StyledProfile>
            <Card>
                <Row align="middle" gutter={8}>
                    <Col>
                        <Avatar size={100} src="https://i1.wp.com/meovatcuocsong.vn/wp-content/uploads/2018/06/anh-dai-dien-facebook-de-thuong5.jpg?w=770&ssl=1"/>
                    </Col>
                    <Col>
                        <Title style={{margin: 0}}>Nguyen Viet Hung</Title>
                    </Col>
                </Row>
                <Row>
                    <QqOutlined/><Text style={{paddingLeft: "16px"}}>Super mot</Text>                    
                </Row>
                <Row gutter={8}>
                    <Col>
                        <Button>Add Friend</Button>                
                    </Col>
                    <Col>
                        <Button>Follow</Button>                
                    </Col>
                </Row>
            </Card>
            <Article/>
            <Article/>
        </StyledProfile>
    )
}
export default Profile

const StyledProfile = styled.div`
    width: 1000px;
    margin: auto;
`