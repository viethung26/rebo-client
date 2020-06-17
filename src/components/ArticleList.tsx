import React, { useEffect } from 'react'
import Article from '@c/Article'
import { List, Modal, message } from 'antd'

export interface IArticleList {
    list:  any[],
    setList: Function
    loading: boolean
}

const ArticleList = (props: IArticleList) => {
    let {list, setList, loading} = props
	const setArticle = index => article => {
        let newList = [...list]
        newList[index] = article
        setList(newList)
    }
    const deleteArticle = index => {
        const {_id} = list[index]
        fetch(`/api/v1/article/${_id}`, {
            method: 'DELETE'
        }).then(res => {
            if (res.status === 200) {
                console.info('9779 delete', res)
                let newList = [...list]
                newList.splice(index, 1)
                setList(newList)
                message.success("Delete completely!")
    
            } else {
                message.error("Has something wrong!")
            }
            
        })
    }
    useEffect(() => {
        console.info('9779 list mount')
        return function () {
            console.info('9779 global unmount')
        }
    }, [])
    return (
        <List 
            loading={loading}
            locale={{ emptyText: () => undefined}}
            dataSource={list}
            renderItem={(article, index) => (
                <Article article={article} onUpdate={setArticle(index)} onDelete={() => Modal.confirm({
                    title: 'Confirm',
                    content: 'Are you sure you want to delete?',
                    onOk: () => deleteArticle(index)
                })}/>

            )}
        />
    )
}
export default ArticleList
