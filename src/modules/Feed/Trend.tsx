import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { trendArticlesState } from 'stores'
import ArticleList from '@c/ArticleList'
import { navigate } from '@reach/router'

const Trend = (props) => {
    const [articleList, setArticleList] = useRecoilState(trendArticlesState)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        console.info('9779 trend mount')
        if (articleList.length === 0) {
            !loading && setLoading(true)
            fetch("/api/v1/article/trending", {
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
            console.info('9779 trend unmount')
        }
    }, [])
    return (
        <>
            <ArticleList list={articleList} setList={setArticleList} loading={loading}/>
        </>
    )
}
export default Trend
