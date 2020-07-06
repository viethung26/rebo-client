import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil'
import { saleListState, addBookOpenState, bookListState, categoriesState, itemModalState } from 'stores'
import { navigate, useLocation, useParams, useMatch } from '@reach/router'
import Header from '@c/Header'
import { Row, Col, Affix, Select, Space } from 'antd'
import SaleList from '@c/SaleList'
import ActionBar from '@m/Layout/ActionBar'
import ItemModal from '@c/ItemModal'

const Market = (props) => {
    const [saleList, setSaleList] = useRecoilState(saleListState)
    const [loading, setLoading] = useState(true)
    const location = useLocation()
    const match = useMatch("/market/:_id")
    const _id = match?._id || ""
    const { user } = props
    const setBookOpen = useSetRecoilState(addBookOpenState)
    const setAddItemOpen = useSetRecoilState(itemModalState)
    const bookList = useRecoilValue(bookListState)

    const selectBook = (bookId) => {
        navigate(`/market/${bookId}`)
    }
    useEffect(() => {
        console.info('9779 Market mount')
        const url = "/api/v1/item?populates=[{\"path\":\"author\"},{\"path\":\"book\"}, {\"path\":\"comments\", \"populate\":\"author\"}]&order={\"createdAt\": \"desc\"}"
            .concat(_id ? `&filter={"book": "${_id}"}` : "")
        !loading && setLoading(true)
        fetch(url, {
            method: "GET",
        }).then(res => {
            if (res.status === 301) {
                // return navigate("/login")
            }
            return res.json()
        })
            .then(res => {
                setSaleList(res)
                setLoading(false)
            })
        return function () {
            console.info('9779 Market unmount')
        }
    }, [_id])
    return (
        <>
            <Affix offsetTop={0}>
                <Header user={user} />
            </Affix>

            <Row justify="center" align="middle" gutter={[16, 16]} style={{ marginTop: 12 }}>
                <Col xxl={8} xl={12} lg={16}>
                    <Space direction="vertical">
                        <Select
                            placeholder="Tìm sách..."
                            showSearch
                            notFoundContent={<p onClick={() => setBookOpen(true)}>Thêm vào sách mới</p>}
                            style={{ width: "100%" }}
                            optionLabelProp="label"
                            optionFilterProp="label"
                            onChange={selectBook}
                            options={bookList.map(book => ({ label: book.title, value: book._id }))}
                        />
                        <SaleList list={saleList} setList={setSaleList} loading={loading} />
                    </Space>

                </Col>
            </Row>
            <ActionBar addFn={() => setAddItemOpen(true)} />
            <ItemModal />
        </>
    )
}
export default Market