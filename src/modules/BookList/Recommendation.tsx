import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { recommendBooksState } from 'stores'
import { Affix, List, Row, Col, Typography } from 'antd'
import BookItem from '@c/BookItem'
const {Text, Title} = Typography
const Recommendation = (props) => {
    const [recommends, setRecommends] = useRecoilState(recommendBooksState)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`/api/v1/book/recommend`, {
            method: 'GET',
            cache: "no-cache"
        }).then(res => {
            setLoading(false)
            return res.json()
        }).then(res => {
            setRecommends(res)
        })
    }, [])
    return (
        <>
            <Title level={3}>Sách được đề xuất</Title>
            <List
                loading={loading}
                grid={{ gutter: 16, column: 3 }}
                dataSource={recommends}
                locale={{ emptyText: "Không có đề xuất nào mới" }}
                renderItem={(item, index) => (
                    <List.Item>
                        <BookItem item={item} />
                    </List.Item>
                )}
            />
        </>
    )
}
export default Recommendation