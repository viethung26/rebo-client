import styled from 'styled-components'
import React, { useEffect } from 'react'
import Top from './Top'
import Content from './Content'
import FooterArticle from './Footer'
import { Avatar, Button, Typography, Layout, Row, Col, Card, Space } from 'antd'
import { RightOutlined, QqOutlined } from '@ant-design/icons'
import { Link } from '@reach/router'
import { io } from '../../sockets'
import VisibilitySensor from 'react-visibility-sensor'
import { pushOrPull } from 'utils'
import { useRecoilValue } from 'recoil'
import { activeUserState } from 'stores'
let a = 0
const Article = (props: any) => {
    const { Title, Text } = Typography
    const { article, onUpdate } = props
    const activeUser = useRecoilValue(activeUserState) || {}
    const handleChangeVisible = isVisible => {
        if (isVisible) {
            io.emit('article-join', {a_id: article._id, a_update: article.updatedAt})
        } else {
            io.emit('article-leave', {a_id: article._id})
        }
    }
    const updateLike = (userID = activeUser?._id) => {
        if (userID) {
            const votes = pushOrPull(article.votes, userID)
            onUpdate({...article, votes, a: a++})
        }   
    }
    const updateComment = (comment) => {
        if (comment) {
            const comments = [...article.comments]
            comments.push(comment)
            onUpdate({...article, comments})
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
    return (
        <VisibilitySensor onChange={handleChangeVisible} partialVisibility={true}>
            <StyledArticle>
                <Card>
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
                                    <Text>50 phút trước</Text>
                                </Col>
                            </Row>

                        </Col>
                        <Col span={8}>
                            <Row align="middle" gutter={4}>
                                <Col span={16}>
                                    <Col>
                                        <Link to={`/profile/${article?.author?.username || ""}`}>
                                            <Button type="link">{article?.author?.username}</Button>
                                        </Link>
                                    </Col>
                                    <Col>
                                        <QqOutlined /><Text style={{ paddingLeft: "4px" }}>Super mot</Text>
                                    </Col>
                                </Col>
                                <Col span={8} style={{ textAlign: "right" }}>
                                    <Avatar src="https://i1.wp.com/meovatcuocsong.vn/wp-content/uploads/2018/06/anh-dai-dien-facebook-de-thuong5.jpg?w=770&ssl=1" />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Content content={article.content} />
                    <FooterArticle articleID={article._id} votes={article?.votes} comments={article.comments} onLike={updateLike} onComment={updateComment}/>
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