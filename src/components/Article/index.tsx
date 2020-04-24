import styled from 'styled-components'
import React from 'react'
import Top from './Top'
import Content from './Content'
import Bottom from './Bottom'
import {Avatar, Button, Typography, Layout, Row, Col, Card} from 'antd'
import {RightOutlined, QqOutlined} from '@ant-design/icons'
import { Link } from '@reach/router'
const Article = () => {
    const {Title, Text} = Typography
    const {Header, Footer, Sider} = Layout
    return (
        <StyledArticle>
            <Card>
                <Row align="middle">
                    <Col flex={5}>
                        <Title level={3} style={{marginBottom: 0}}>Review nhẹ về tác phẩm</Title>  
                        <Link to="/book/ban-khong">
                            <Button icon={<RightOutlined/>} type="link">Bạn không thông minh lắm đâu</Button>
                        </Link> 
                        <Text>50 phút trước</Text>     
                    </Col>
                    <Col flex={1}>
                        <Row align="middle">
                            <Col>
                                <Col>
                                    <Link to="/profile/nguyen-viethung">
                                        <Button type="link">Nguyễn Việt Hùng</Button>
                                    </Link>
                                </Col>
                                <Col>
                                    <QqOutlined/><Text style={{paddingLeft: "16px"}}>Super mot</Text>
                                </Col>
                            </Col>
                            <Col>
                                <Avatar src="https://i1.wp.com/meovatcuocsong.vn/wp-content/uploads/2018/06/anh-dai-dien-facebook-de-thuong5.jpg?w=770&ssl=1"/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Content/>
                <Bottom/>
            </Card>
            {/* <Top/> */}
        </StyledArticle>
    )
}

export default Article

const StyledArticle = styled.div<any>`
    margin-bottom: 12px;
`