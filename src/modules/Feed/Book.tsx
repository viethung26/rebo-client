import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ArticleList from '@c/ArticleList'
import { bookArticlesState } from 'stores'
import { navigate } from '@reach/router'
import { useRecoilState } from 'recoil'

const Book = (props) => {
    const [articleList, setArticleList] = useRecoilState(bookArticlesState)
    const [loading, setLoading] = useState(true)
    const { slug } = props
    useEffect(() => {
        console.info('9779 book mount', slug)
        !loading && setLoading(true)
        fetch(`/api/v1/article/book/${slug}`, {
            method: "GET",
        }).then(res => {
            if (res.status === 301) {
                // return navigate("/login")
            } else if (res.status === 404) {
                return alert("book not found")
            }
            return res.json()
        })
            .then(res => {
                setArticleList(res)
                setLoading(false)
            })

        return function () {
            console.info('9779 book unmount')
        }
    }, [slug])
    return (
        <ArticleList list={articleList} setList={setArticleList} loading={loading} />
    )
}
export default Book

const StyledBook = styled.div``