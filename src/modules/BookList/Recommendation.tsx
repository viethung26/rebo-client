import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { recommendBooksState } from 'stores'
import { Affix, List, Row, Col } from 'antd'
import BookItem from '@c/BookItem'

const Recommendation = (props) => {
    const [recommends, setRecommends] = useRecoilState(recommendBooksState)
    useEffect(() => {
        fetch(`/api/v1/book/recommend`, {
            method: 'GET'
        }).then(res => {
            return res.json()
        }).then(res => {
            setRecommends(res)
            console.info('9779 res', res)
        })
    }, [])
    return (
        <List
            loading={!recommends.length}
            grid={{ gutter: 16, column: 3 }}
            dataSource={recommends}
            locale={{ emptyText: () => undefined }}
            renderItem={(item, index) => (
                <List.Item>
                    <BookItem item={item} />
                </List.Item>
            )}
        />
    )
}
export default Recommendation