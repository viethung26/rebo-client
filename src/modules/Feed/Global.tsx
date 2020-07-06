import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { articleListState } from 'stores'
import ArticleList from '@c/ArticleList'
import { navigate } from '@reach/router'
import { Button, Typography } from 'antd'

const { Text } = Typography
const Global = (props) => {
    const [articleList, setArticleList] = useRecoilState(articleListState)
    const [loading, setLoading] = useState(true)
    const {isEnd, page} = articleList
    const setList = list => {
        setArticleList({...articleList, list})
    }
    const fetchByPage = () => {
        if (page > 0 && !isEnd) {
            console.info('9779 fetch')
            fetch(`/api/v1/article?limit=10&offset=${page * 10}&populates=[{\"path\":\"author\"},{\"path\":\"book\"}, {\"path\":\"comments\", \"populate\":\"author\"}]&order={\"createdAt\": \"desc\"}`, {
                method: "GET",
            }).then(res => {
                if (res.status === 301) {
                    return navigate("/login")
                }
                return res.json()
            })
                .then(res => {
                    const isEnd = res.length < 10
                    setArticleList({ list: [...articleList.list, ...res], page: articleList.page + 1, isEnd })
                })
        }
    }

    const loadArticle = () => {
        !loading && setLoading(true)
        fetch("/api/v1/article?limit=10&populates=[{\"path\":\"author\"},{\"path\":\"book\"}, {\"path\":\"comments\", \"populate\":\"author\"}]&order={\"createdAt\": \"desc\"}", {
            method: "GET",
            cache: "no-cache"
        }).then(res => {
            if (res.status === 301) {
                return navigate("/login")
            }
            return res.json()
        })
            .then(res => {
                setArticleList({ list: res, page: 1, isEnd: res.length < 10 })
                setLoading(false)
            })
    }

    useEffect(() => {
        console.info('9779 global mount', articleList)
            loadArticle()
            // !loading && setLoading(true)
            // fetch("/api/v1/article?limit=10&populates=[{\"path\":\"author\"},{\"path\":\"book\"}, {\"path\":\"comments\", \"populate\":\"author\"}]&order={\"createdAt\": \"desc\"}", {
            //     method: "GET",
            //     cache: "no-cache"
            // }).then(res => {
            //     if (res.status === 301) {
            //         return navigate("/login")
            //     }
            //     return res.json()
            // })
            //     .then(res => {
            //         setArticleList({ list: res, page: 1, isEnd: res.length < 10 })
            //         setLoading(false)
            //     })
        return function () {
            console.info('9779 global unmount')
        }
    }, [])

    return (
        <StyledGlobal>
            <ArticleList list={articleList.list} setList={setList} loading={loading} />
            {!loading && (isEnd ? <Text>Hết</Text> : <Button type="primary" onClick={fetchByPage}>Xem thêm</Button>)}
        </StyledGlobal>
    )
}
export default Global

const StyledGlobal = styled.div``