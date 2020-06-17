import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { articleListState } from 'stores'
import ArticleList from '@c/ArticleList'
import { navigate } from '@reach/router'

const Global = (props) => {
    const [articleList, setArticleList] = useRecoilState(articleListState)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        console.info('9779 global mount')
        if (articleList.length === 0) {
            !loading && setLoading(true)
            fetch("/api/v1/article?populates=[{\"path\":\"author\"},{\"path\":\"book\"}, {\"path\":\"comments\", \"populate\":\"author\"}]&order={\"createdAt\": \"desc\"}", {
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
        } else {
            setLoading(false)
        }
        return function () {
            console.info('9779 global unmount')
        }
    }, [])
    return (
        <StyledGlobal>
            <ArticleList list={articleList} setList={setArticleList} loading={loading}/>
        </StyledGlobal>
    )
}
export default Global

const StyledGlobal = styled.div``