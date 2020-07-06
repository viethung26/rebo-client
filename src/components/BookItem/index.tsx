import React, { useEffect } from 'react'
import { Avatar, Button, Typography, Layout, Row, Col, Card, Space, Dropdown, Menu, Affix, Rate, Popover, message } from 'antd'
import { RightOutlined, QqOutlined, EllipsisOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Link, navigate } from '@reach/router'
import { io } from '../../sockets'
import VisibilitySensor from 'react-visibility-sensor'
import { pushOrPull } from 'utils'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { activeUserState, articleModalStatusState, articleModalOpenState } from 'stores'
import moment from 'moment'
const { Title, Text } = Typography
const handleMenuClick = ({ item, key }) => {
    if (key === 'edit') {
    } else if (key === 'delete') {
    }
}

const BookItem = (props) => {
    const activeUser = useRecoilValue(activeUserState) || {}
    const { item } = props
    const isReading = activeUser?.readings?.includes(item._id)
    const isRead = activeUser?.reads?.includes(item._id)
    let rateStar = item.rates?.reduce((total, rate) => total + rate.star, 0) || 0
    if (rateStar > 0 && item.rates?.length) {
        rateStar = rateStar / item.rates.length
    }
    // const author = item?.author
    // const isOwner = activeUser._id === item.author._id
    const menuDropdown = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="edit" icon={<EditOutlined />}>
                Edit
            </Menu.Item>
            <Menu.Item key="delete" icon={<DeleteOutlined />}>
                Delete
            </Menu.Item>
        </Menu>
    )
    const handleRate = (star) => {
        fetch("/api/v1/rate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                star,
                book: item._id
            })
        }).then(res => {
            message.success("Đánh giá thành công!")
        })
    }
    const handleReading = () => {
        fetch("/api/v1/user/startreading", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                book: item._id
            })
        })
    }
    const handleRead = () => {
        fetch("/api/v1/user/finishreading", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                book: item._id
            })
        })
    }

    return (
        <Card style={{ marginBottom: 12 }}>
            <Row align="middle" gutter={[16, 16]}>
                <Col span={24}>
                    <Row align="middle">
                        {/* <Title level={4}>{item.title}</Title> */}
                    </Row>
                </Col>
                <Col span={24} style={{ textAlign: "center" }}>
                    <img onClick={() => { navigate(`/book/${item.slug}`)}} alt={item.title} height="200" src={item.cover} />
                </Col>
                <Col span={24} style={{ textAlign: "center" }}>
                    <Rate disabled value={rateStar} />
                </Col>
                <Col span={24}>
                    <Row align="middle" gutter={4}>
                        <Button type={isReading ? "primary" : "default"} onClick={handleReading}>Đang đọc</Button>
                        <Popover content={<Rate onChange={handleRate}/>} title="Đánh giá" trigger="click">
                            <Button type={isRead ? "primary" : "default"} onClick={handleRead}>Đã đọc</Button>
                        </Popover>

                    </Row>
                </Col>
            </Row>
        </Card>
    )
}
export default BookItem