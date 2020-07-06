import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { interestedArticlesState } from 'stores'
import ArticleList from '@c/ArticleList'
import { navigate } from '@reach/router'

const Interest = (props) => {
    const [articleList, setArticleList] = useRecoilState(interestedArticlesState)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        console.info('9779 interest mount')
        if (articleList.length === 0) {
            !loading && setLoading(true)
            fetch("/api/v1/article/interest", {
                method: "GET",
                cache: "no-cache"
            }).then(res => {
                if (res.status === 301) {
                    return navigate("/login")
                }
                return res.json()
            })
            .then(res => {
                console.info('9779 res', res)
                setArticleList(res)
                setLoading(false)
            })
        } else {
            setLoading(false)
        }
        return function () {
            console.info('9779 interest unmount')
        }
    }, [])
    return (
        <>
            <ArticleList list={articleList} setList={setArticleList} loading={loading}/>
        </>
    )
}
export default Interest
