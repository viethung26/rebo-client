import React, { useEffect } from 'react'
import { Avatar, Button, Typography, Layout, Row, Col, Card, Space, Dropdown, Menu, Affix } from 'antd'
import { UserOutlined, QqOutlined, EllipsisOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Link } from '@reach/router'
import { useRecoilValue, } from 'recoil'
import { activeUserState, articleModalStatusState, articleModalOpenState } from 'stores'
import moment from 'moment'
const { Title, Text } = Typography

const SaleItem = (props) => {
    const activeUser = useRecoilValue(activeUserState) || {}

    const { onDelete, item } = props
    const author = item?.author
    const isOwner = activeUser._id === item.author._id
    const handleMenuClick = ({ item, key }) => {
        if (key === 'delete') {
            onDelete()
        }
    }
    const menuDropdown = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="delete" icon={<DeleteOutlined />}>
                Delete
            </Menu.Item>
        </Menu>
    )
    return (
        <Card style={{marginBottom: 12}}>
            {isOwner && <Dropdown overlay={menuDropdown} placement="bottomRight" trigger={["click"]}>
                <EllipsisOutlined style={{ position: 'absolute', right: 8, top: 8 }} />
            </Dropdown>}
            <Row align="middle" gutter={16}>
                <Col span={16}>
                    <Row align="middle">
                        <Col span={24}>
                            <Title level={3} style={{ marginBottom: 0 }}>{item.book.title}</Title>
                        </Col>
                        <Col span={16} style={{ overflow: "hidden" }}>
                            <Text><b>Giá: </b>{item.price} VND</Text>
                        </Col>
                        <Col span={8} style={{ textAlign: "right" }}>
                            <Text>{moment(item.createdAt).fromNow()}</Text>
                        </Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <Row align="middle" gutter={4}>
                        <Col span={16}>
                            <Col>
                                <Link to={`/profile/${author?.username || ""}`}>
                                    <Button type="link">{author?.displayname || author?.username}</Button>
                                </Link>
                            </Col>
                            <Col>
                                <QqOutlined /><Text style={{ paddingLeft: "4px" }}>Người mới</Text>
                            </Col>
                        </Col>
                        <Col span={8} style={{ textAlign: "right" }}>
                            <Avatar icon={<UserOutlined />} src={author?.avatar}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Text><b>Tình trạng: </b>{item.description}</Text>
            </Row>
            <Row>
                <Text><b>Liên hệ: </b>{item.contact}</Text>
            </Row>
            <Row>
                {item.image && <Avatar shape="square" size={128} src={item.image} />}
            </Row>
        </Card>
    )
}
export default SaleItem