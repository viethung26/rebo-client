import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import NewPost from '@c/NewPost'
import Article from '@c/Article'
import NewBook from '@c/NewBook'
import { useRecoilState, useRecoilValue } from 'recoil'
import { articleListState, activeUserState } from 'stores'
import { List } from 'antd'

const Global = (props) => {
    let [articleList, setArticleList] = useRecoilState(articleListState)
	const setArticle = index => article => {
        let newList = [...articleList]
        newList[index] = article
        setArticleList(newList)
    }

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        console.info('9779 global mount')
        if (articleList.length === 0) {
            !loading && setLoading(true)
            fetch("/api/v1/article?populates=[{\"path\":\"author\"},{\"path\":\"book\"}, {\"path\":\"comments\", \"populate\":\"author\"}]", {
                method: "GET",
            }).then(res => res.json())
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
            <NewPost/>
            <NewBook/>
            <List 
                loading={loading}
                locale={{ emptyText: () => undefined}}
                dataSource={articleList}
                renderItem={(article, index) => (
                    <Article article={article} onUpdate={setArticle(index)}/>

                )}
            />
        </StyledGlobal>
    )
}
export default Global

const StyledGlobal = styled.div``