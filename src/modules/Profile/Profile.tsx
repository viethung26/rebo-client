import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Avatar, Typography, Card, Button, Row, Col, List } from 'antd'
import { QqOutlined, UserOutlined } from '@ant-design/icons'
import Article from '@c/Article'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { myArticlesState, profileSettingModalState, favoriteModalState } from 'stores'
import { navigate } from '@reach/router'
import Header from '@c/Header'
import ArticleList from '@c/ArticleList'

const { Title, Text } = Typography
const Profile = (props) => {
    const [loading, setLoading] = useState(true)
    let [articleList, setArticleList] = useRecoilState(myArticlesState)
    const setProfileModal = useSetRecoilState(profileSettingModalState)
    const setFavoriteModal = useSetRecoilState(favoriteModalState)
    const { username, user } = props
    const [o_user, setO_user] = useState(null)
    const isOwner = o_user ? o_user._id === user?._id : false
    const setArticle = index => article => {
        let newList = [...articleList]
        newList[index] = article
        setArticleList(newList)
    }
    console.info('9779 ', o_user)
    const handleEditName = (v) => {
        console.info('9779 v', v)
    }

    useEffect(() => {
        !loading && setLoading(true)
        fetch(`/api/v1/article/profile/${username}`, {
            method: "GET",
            cache: "no-cache"
        }).then(res => {
            if (res.status === 301) {
                return navigate("/login")
            }
            return res.json()
        })
            .then(res => {
                setArticleList(res)
                setLoading(false)
            })
            // {"username": "viethung97"}
        fetch(`/api/v1/user?filter={\"username\":\"${username}\"}`, {
            method: "GET",
        }).then(res => {
            if (res.status === 301) {
                return navigate("/login")
            }
            return res.json()
        })
            .then(res => {
                setO_user(res[0])
            })
        return function () {
            console.info('9779 profile feed unmount')
        }
    }, [username])

    return (
        <StyledProfile>
            <Header user={user} />
            <Row justify="center" align="middle">
                <Col xxl={8} xl={12} lg={16}>
                    <Card>
                        <Row align="middle" gutter={8}>
                            <Col>
                            <Avatar size="large" icon={<UserOutlined />} src={o_user?.avatar} />
                            </Col>
                            <Col>
                                <Title style={{ margin: 0 }}>{o_user?.displayname|| o_user?.username}</Title>
                            </Col>
                        </Row>
                        <Row>
                            <QqOutlined /><Text style={{ paddingLeft: "16px" }}>Người mới</Text>
                        </Row>
                        <Row gutter={8}>
                            <Col>
                                <Button>Đang đọc: {o_user?.readings?.length}</Button>
                            </Col>
                            <Col>
                                <Button>Đã đọc: {o_user?.reads?.length}</Button>
                            </Col>
                            {isOwner && <Col>
                                <Button onClick={() => navigate('/books/recommendation')}>Xem đề xuất</Button>
                            </Col>}
                            {isOwner && <Col>
                                <Button onClick={() => setFavoriteModal(true)}>Thể loại ưa thích</Button>
                            </Col>}
                            {isOwner && <Col>
                                <Button onClick={() => setProfileModal(true)}>Thiết lập</Button>
                            </Col>}
                        </Row>
                    </Card>
                    {/* <List
                        loading={loading}
                        locale={{ emptyText: "Chưa có bài viết nào" }}
                        dataSource={articleList}
                        renderItem={(article, index) => (
                            <Article article={article} onUpdate={setArticle(index)} onDelete={() => Modal.confirm({
                                title: 'Xác nhận',
                                content: 'Bạn chắc chắn muốn xóa bài viết này?',
                                okText: 'Đồng ý',
                                cancelText: "Hủy",
                                onOk: () => deleteArticle(index)
                            })}/>/>

                        )}
                    /> */}
                    <ArticleList list={articleList} setList={setArticleList} loading={loading} />
                </Col>

            </Row>

        </StyledProfile>
    )
}
export default Profile

const StyledProfile = styled.div`
`