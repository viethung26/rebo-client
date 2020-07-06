import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { bookListState, recommendBooksState, categoriesState } from 'stores'
import { Affix, List, Row, Col, Input, Space, Select } from 'antd'
import BookItem from '@c/BookItem'
import { navigate } from '@reach/router'


const AllBook = (props) => {
    const bookList = useRecoilValue(bookListState) || []
    const categories = useRecoilValue(categoriesState)
    const [searchKey, setSearchKey] = useState("")
    const [selectCategories, setSelectCategories] = useState([])
    let filterList = bookList.filter(book => book.title.toLowerCase().includes(searchKey.toLowerCase()))
    if (selectCategories.length > 0) {
        filterList = filterList.filter(book => book.categories.some(c => selectCategories.includes(c)))
    }
    const handleSelectCategories = (v: any[]) => {
        setSelectCategories(v)
    } 
    return (
        <>
            <Space direction="vertical" >
                <Input.Search placeholder="Tìm sách..." onSearch={setSearchKey} style={{ marginTop: 12}} />
                <Select
                    placeholder="Chọn thể loại"
                    optionLabelProp="label"
                    optionFilterProp="label"
                    mode="multiple"
                    showSearch allowClear
                    style={{ width: "100%" }}
                    onChange={handleSelectCategories}
                    options={categories.map(category => ({ label: category.name, value: category._id }))}
                />
                <List
                    loading={!bookList.length}
                    grid={{ gutter: 16, column: 3 }}
                    dataSource={filterList}
                    locale={{ emptyText: "Không tìm thấy cuốn sách nào" }}
                    renderItem={(item, index) => (
                        <List.Item>
                            <BookItem item={item} />
                        </List.Item>
                    )}
                />
            </Space>

        </>
    )
}
export default AllBook