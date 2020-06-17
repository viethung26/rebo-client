import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Avatar, Typography, Card, Button, Row, Col, List } from 'antd'
import {QqOutlined} from '@ant-design/icons'
import Article from '@c/Article'
import { useRecoilState } from 'recoil'
import { myArticlesState } from 'stores'
import { navigate } from '@reach/router'

const {Title, Text} = Typography
const Profile = (props) => {
    const [loading, setLoading] = useState(true)
    let [articleList, setArticleList] = useRecoilState(myArticlesState)
    const {username} = props
	const setArticle = index => article => {
        let newList = [...articleList]
        newList[index] = article
        setArticleList(newList)
    }

    useEffect(() => {
            !loading && setLoading(true)
            fetch(`/api/v1/article/profile/${username}`, {
                method: "GET",
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
        return function () {
            console.info('9779 profile feed unmount')
        }
    }, [username])
    
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
            <List 
                loading={loading}
                locale={{ emptyText: () => undefined}}
                dataSource={articleList}
                renderItem={(article, index) => (
                    <Article article={article} onUpdate={setArticle(index)}/>

                )}
            />
        </StyledProfile>
    )
}
export default Profile

const StyledProfile = styled.div`
    width: 1000px;
    margin: auto;
`