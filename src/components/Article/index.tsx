import styled from 'styled-components'
import React, { useEffect } from 'react'
import Top from './Top'
import Content from './Content'
import FooterArticle from './Footer'
import { Avatar, Button, Typography, Layout, Row, Col, Card, Space, Dropdown, Menu, Affix } from 'antd'
import { RightOutlined, QqOutlined, EllipsisOutlined, UserOutlined, EditOutlined, DeleteOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { Link } from '@reach/router'
import { io } from '../../sockets'
import VisibilitySensor from 'react-visibility-sensor'
import { pushOrPull } from 'utils'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { activeUserState, articleModalStatusState, articleModalOpenState } from 'stores'
import moment from 'moment'

const { Title, Text } = Typography

const Article = (props: any) => {
    const activeUser = useRecoilValue(activeUserState) || {}
    const setEditModal = useSetRecoilState(articleModalStatusState)
    const setModalOpen = useSetRecoilState(articleModalOpenState)
    const { article, onUpdate, onDelete } = props
    const author = article?.author
    const isOwner = activeUser._id === article.author._id

    const handleChangeVisible = isVisible => {
        if (isVisible) {
            io.emit('article-join', { a_id: article._id, a_update: article.updatedAt })
        } else {
            io.emit('article-leave', { a_id: article._id })
        }
    }
    const updateLike = (userID = activeUser?._id) => {
        if (userID) {
            const votes = pushOrPull(article.votes, userID)
            onUpdate({ ...article, votes })
        }
    }
    const updateComment = (comment) => {
        if (comment) {
            const comments = [...article.comments]
            comments.push(comment)
            onUpdate({ ...article, comments })
        }
    }
    const handleMenuClick = ({ item, key }) => {
        if (key === 'edit') {
            setEditModal({ isEditing: true, article, updateCallback: onUpdate })
            setModalOpen(true)
        } else if (key === 'delete') {
            onDelete()
        }
    }
    useEffect(() => {
        io.on(`like-${article._id}`, userID => {
            updateLike(userID)
        })
        io.on(`comment-${article._id}`, newComment => {
            updateComment(newComment)
        })
        io.on(`update-${article._id}`, newArticle => {
            onUpdate(newArticle)
        })
        return () => {
            io.off(`like-${article._id}`)
            io.off(`update-${article._id}`)
            io.off(`comment-${article._id}`)
        }
    })
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
    return (
        <VisibilitySensor onChange={handleChangeVisible} partialVisibility={true}>
            <StyledArticle>
                <Card>
                    {isOwner && <Dropdown overlay={menuDropdown} placement="bottomRight" trigger={["click"]}>
                        <EllipsisOutlined style={{ position: 'absolute', right: 8, top: 8 }} />
                    </Dropdown>}
                    <Row align="middle" gutter={16}>
                        <Col span={16}>
                            <Row align="middle">
                                <Col span={24}>
                                    <Title level={3} style={{ marginBottom: 0 }}>{article.title}</Title>
                                </Col>
                                <Col span={16} style={{ overflow: "hidden" }}>
                                    <Link to={`/book/${article?.book?.slug || ""}`}>
                                        <Button icon={<RightOutlined />} type="link" style={{ padding: 0 }}>{article.book?.title}</Button>
                                    </Link>
                                </Col>
                                <Col span={8} style={{ textAlign: "right" }}>
                                    <Text>{moment(article.createdAt).fromNow()}</Text>
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
                                    <Avatar size="large" icon={<UserOutlined />} src={author?.avatar} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Content content={article.content} />
                    <Button icon={<ArrowRightOutlined />} style={{ position: 'absolute', right: 0 }}><Link to={`/market/${article?.book?._id}`}> Đến chợ ngay</Link></Button>
                    <FooterArticle articleID={article._id} votes={article?.votes} comments={article.comments} onLike={updateLike} onComment={updateComment} />
                </Card>
                {/* <Top/> */}
            </StyledArticle>
        </VisibilitySensor>

    )
}

export default Article

const StyledArticle = styled.div<any>`
    margin-bottom: 12px;
`