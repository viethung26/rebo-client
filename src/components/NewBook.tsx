import React, { useState } from 'react'
import { Modal, Form, Input, Select, Button, Alert, Upload, message } from 'antd'
import { withTranslation } from 'react-i18next'
import { useRecoilState, useRecoilValue } from 'recoil'
import { addBookOpenState, categoriesState } from 'stores'
import { UploadOutlined } from '@ant-design/icons'
const NewBook = (props) => {
    const [form] = Form.useForm()
    const [open, setOpen] = useRecoilState(addBookOpenState)
    const categories = useRecoilValue(categoriesState)

    const [file, setFile] = useState(null)
    const [posting, setPosting] = useState(false)

    const { t } = props
    const { Option } = Select

    const closeModal = () => {

    }
    const handlePost = () => {
        if (form.isFieldsTouched(true) && form.getFieldsError().filter(({ errors }) => errors.length).length === 0) {
            const title = form.getFieldValue("title")
            const author = form.getFieldValue("author")
            const types = [form.getFieldValue("type")]
            setPosting(true)
                fetch("/api/v1/book", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ title, author, categories: types })
                }).then(res => {
                    setPosting(false)
                    return res.json()
                }).then(res => {
                    closeModal()
                })

        }
    }
    const handleFile = e => {
        console.info('9779 file', e.target.files)
        const file = e.target.files[0]
        setFile(file)
    }
    return (
        <Modal bodyStyle={{ padding: 0 }} title={t('Add new book')} visible={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)} width={800} footer={null}>
            <Alert message="Cảm ơn sự đóng góp của bạn, bạn sẽ nhận được danh hiệu khi sách được kiểm duyệt" type="warning" />
            <Form form={form} name="article">
                <Form.Item
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: "Không được để trống tiêu đề"
                        }
                    ]}
                >
                    <Input addonBefore="Title" />
                </Form.Item>
                <Form.Item
                    name="author"
                    rules={[
                        {
                            required: true,
                            message: "Không được để trống tác giả"
                        }
                    ]}
                >
                    <Input addonBefore="Author" />
                </Form.Item>
                <Form.Item
                    name="type"
                    rules={[
                        {
                            required: true,
                            message: "Lựa chọn nội dung"
                        }
                    ]}
                >
                    <Select
                        placeholder="Chọn thể loại"
                        optionLabelProp="label"
                        mode="multiple"
                        showSearch allowClear
                        style={{ width: "100%" }}
                        options={categories.map(category => ({ label: category.name, value: category._id }))}
                    />
                </Form.Item>
                <input type="file" id="coverFile" name="coverFile" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
                <Button disabled={true}>
                    <label htmlFor="coverFile">
                        <UploadOutlined /> Upload cover
                            </label>
                </Button>
                {/* <Input type="file" onChange={e => console.info('9779 file', e)}/> */}
                {/* <Upload {...uploadProps}>
                    <Button>
                        <UploadOutlined /> Upload cover
                    </Button>
                </Upload> */}
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
                        >Add Book</Button>
                    )}
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default withTranslation()(NewBook)