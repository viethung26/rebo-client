import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { withTranslation } from 'react-i18next'
import UIModal from '@p/UI/Modal'
import UIButton from '@p/UI/Button'
import { Modal, Button, Input, Select, Form } from 'antd'
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil'
import { addBookOpenState, bookListState, articleModalOpenState } from 'stores'
const keyMaps = ["b", "i"]
const metaFunction = (key: string) => {
    console.info('9779 key', key)
    switch (key) {
        // case "a": document.execCommand("selectAll")
        // break
        case "b": document.execCommand("bold")
            break
        case "i": document.execCommand("italic")
            break
        // case "c": document.execCommand("copy")
        // break
    }
}
// const formatBold = () => {
//     console.info('9779 bold')
//     document.execCommand("bold")
// }
let flag
const saveDraft = (el) => {
    clearTimeout(flag)
    flag = setTimeout(() => {
        const text = el.innerHTML
        localStorage.setItem("REBO_DRAFT_CONTENT", text)
        console.info('9779 save', text)
    }, 300)
}
const removeDraft = () => {
    localStorage.removeItem("REBO_DRAFT_CONTENT")
}
const getDraft = () => {
    return localStorage.getItem("REBO_DRAFT_CONTENT") || ""
}
const NewPost = (props: any) => {
    const [posting, setPosting] = useState(false)
    const [form] = Form.useForm()
    const bookList = useRecoilValue(bookListState)
    const setBookOpen = useSetRecoilState(addBookOpenState)
    const [articleOpen, setArticleOpen] = useRecoilState(articleModalOpenState)
    const textBoxRef = useRef(null)

    const closeArticleModal = () => setArticleOpen(false)
    const handleKeyDown = (e) => {
        const key = e.key.toLowerCase()
        if (e.metaKey && keyMaps.includes(key)) {
            e.preventDefault()
            metaFunction(key)
        }
        saveDraft(textBoxRef?.current)
    }
    const { t } = props
    const { Option } = Select
    const handlePost = () => {
        //9779 continue using api to post new article
        if (form.isFieldsTouched(true) && form.getFieldsError().filter(({ errors }) => errors.length).length === 0) {
            const title = form.getFieldValue("title")
            const content = getDraft()
            const book = form.getFieldValue("book")
            const type = form.getFieldValue("type")
            console.info('9779 post', type, title, content)
            setPosting(true)
            fetch("/api/v1/article", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, content, book, type })
            }).then(res => {
                setPosting(false)
                removeDraft()
                return res.json()
            }).then(res => console.info('9779 res', res))
        }

    }
    return (
        <Modal bodyStyle={{ padding: 0 }} title={t('New Post')} visible={articleOpen} onOk={closeArticleModal} onCancel={closeArticleModal} width={800} footer={null}>
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
                        options={bookList.map(book => ({ label: book.title, value: book._id }))}
                    />
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
                        placeholder="Chọn nội dung"
                        optionLabelProp="label"
                        showSearch allowClear
                        style={{ width: "100%" }}
                    >
                        <Option value="Review">Review</Option>
                        <Option value="Discussion">Discussion</Option>
                        <Option value="QA">Question and Answer</Option>
                        <Option value="Others">Others</Option>
                    </Select>
                </Form.Item>
                <StyledContent placeholder="Nhấp vào đây để viết nội dung" ref={textBoxRef} contentEditable={true} onKeyDown={handleKeyDown} dangerouslySetInnerHTML={{ __html: getDraft() }} />
                <Form.Item shouldUpdate={true}>
                    {() => (
                        <Button type="primary"
                            htmlType="submit"
                            block
                            onClick={handlePost}
                            loading={posting}
                            disabled={
                                !form.isFieldsTouched(true) || 
                                form.getFieldsError().filter(({errors}) => errors.length).length > 0
                            }
                        >Post</Button>
                    )}

                </Form.Item>
            </Form>
        </Modal>
    )
}
export default withTranslation()(NewPost)

const StyledContent = styled.div<any>`
    width: 100%;
    height: 300px;
    padding: 8px 16px;
    outline: none;
    &[placeholder]:empty::before {
        content: attr(placeholder);
        color: #888; 
    }
    overflow-y: auto;
    
    &[placeholder]:empty:focus::before {
        content: "";
    }
`