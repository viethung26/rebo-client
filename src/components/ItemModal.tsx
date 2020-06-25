import React, { useState } from 'react'
import { Modal, Form, Input, Button, message, Select } from 'antd'
import { withTranslation } from 'react-i18next'
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil'
import {  profileSettingModalState, addBookOpenState, bookListState, itemModalState } from 'stores'
const ItemModal = (props) => {
    const {user} = props
    const [form] = Form.useForm()
    const [open, setOpen] = useRecoilState(itemModalState)
    const bookList = useRecoilValue(bookListState)
    const setBookOpen = useSetRecoilState(addBookOpenState)

    const [posting, setPosting] = useState(false)
    const closeModal = () => {
        setOpen(false)
    }
    const handlePost = () => {
        if (form.isFieldsTouched(true) && form.getFieldsError().filter(({ errors }) => errors.length).length === 0) {
            const book = form.getFieldValue("book")
            const price = form.getFieldValue("price")
            const contact = form.getFieldValue("contact")
            const description = form.getFieldValue("description")
            const image = form.getFieldValue("image")
            setPosting(true)
                fetch(`/api/v1/item`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ book, price, contact, description, image })
                }).then(res => {
                    setPosting(false)
                    return res.json()
                }).then(res => {
                    console.info('9779 res', res)
                    closeModal()
                })

        }
    }
    return (
        <Modal bodyStyle={{ padding: 0 }} title={"Đăng bán sách"} visible={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)} width={800} footer={null}>
            <Form form={form} name="item">
            <Form.Item
                    name="book"
                    rules={[
                        {
                            required: true,
                            message: "Lựa chọn sách"
                        }
                    ]}
                >
                    <Select
                        placeholder="Chọn 1 cuốn sách"
                        showSearch allowClear
                        notFoundContent={<p onClick={() => setBookOpen(true)}>Thêm vào sách mới</p>}
                        style={{ width: "100%" }}
                        optionLabelProp="label"
                        optionFilterProp="label"
                        options={bookList.map(book => ({ label: book.title, value: book._id }))}
                    />
                </Form.Item>
                <Form.Item
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: "Nhập mô tả"
                        }
                    ]}
                >
                    <Input placeholder="Mô tả trạng thái sách"/>
                </Form.Item>
                <Form.Item
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: "Nhập giá bán"
                        }
                    ]}
                >
                    <Input type="number" placeholder="Giá sách VND" />
                </Form.Item>
                <Form.Item
                    name="contact"
                    rules={[
                        {
                            required: true,
                            message: "Nhập phương thức liên lạc"
                        }
                    ]}
                >
                    <Input placeholder="Phương thức liên lạc" />
                </Form.Item>
                <Form.Item
                    name="image"
                >
                    <Input placeholder="Địa chỉ ảnh cuốn sách" />
                </Form.Item>
                <Form.Item shouldUpdate={true}>
                    {() => (
                        <Button type="primary"
                            htmlType="submit"
                            block
                            onClick={handlePost}
                            loading={posting}
                            disabled={
                                !form.isFieldsTouched(true) ||
                                form.getFieldsError().filter(({ errors }) => errors.length).length > 0
                            }
                        >Đăng bán</Button>
                    )}
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default withTranslation()(ItemModal)