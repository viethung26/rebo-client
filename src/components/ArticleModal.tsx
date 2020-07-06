import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import { withTranslation } from 'react-i18next'
import UIModal from '@p/UI/Modal'
import UIButton from '@p/UI/Button'
import { Modal, Button, Input, Select, Form, message } from 'antd'
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil'
import { addBookOpenState, bookListState, articleModalOpenState, articleModalStatusState } from 'stores'
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
const saveDraft = (el, editMode = false) => {
    clearTimeout(flag)
    const key = editMode ? "REBO_DRAFT_EDIT_CONTENT" : "REBO_DRAFT_CONTENT"
    flag = setTimeout(() => {
        const text = el.innerHTML
        localStorage.setItem(key, text)
        console.info('9779 save', text)
    }, 300)
}
const removeDraft = (editMode = false) => {
    const key = editMode ? "REBO_DRAFT_EDIT_CONTENT" : "REBO_DRAFT_CONTENT"
    localStorage.removeItem(key)
}
const getDraft = (editMode = false) => {
    const key = editMode ? "REBO_DRAFT_EDIT_CONTENT" : "REBO_DRAFT_CONTENT"
    return localStorage.getItem(key) || ""
}
const ArticleModal = (props: any) => {
    const [posting, setPosting] = useState(false)
    const [form] = Form.useForm()
    const bookList = useRecoilValue(bookListState)
    const setBookOpen = useSetRecoilState(addBookOpenState)
    const [status, setStatus] = useRecoilState(articleModalStatusState)
    const [articleOpen, setArticleOpen] = useRecoilState(articleModalOpenState)
    const contentRef = useRef(null)
    const { t } = props
    const { Option } = Select
    const {isEditing: editMode, article} = status
    const closeArticleModal = () => {
        setStatus({isEditing: false, article: null, updateCallback: null})
        setArticleOpen(false)
        form.resetFields()
    }
    const handleKeyDown = (e) => {
        const key = e.key.toLowerCase()
        if (e.metaKey && keyMaps.includes(key)) {
            e.preventDefault()
            metaFunction(key)
        }
        saveDraft(contentRef?.current, editMode)
    }
    
    const handlePost = () => {
        if (editMode || (form.isFieldsTouched(true) && form.getFieldsError().filter(({ errors }) => errors.length).length === 0)) {
            const title = form.getFieldValue("title")
            const content = contentRef.current?.innerHTML || getDraft(editMode)
            const book = form.getFieldValue("book")
            const type = form.getFieldValue("type")
            console.info('9779 post', type, title, content)
            if (!editMode) {
                setPosting(true)
                fetch("/api/v1/article", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ title, content, book, type })
                }).then(res => {
                    setPosting(false)
                    removeDraft(editMode)
                    return res.json()
                }).then(res => {
                    message.success("Đăng bài thành công!")
                    closeArticleModal()
                })
            } else {
                setPosting(true)
                fetch(`/api/v1/article/${article._id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ content })
                }).then(res => {
                    setPosting(false)
                    removeDraft(editMode)
                    return res.json()
                }).then(res => {
                    const {content} = res
                    if (content && typeof status.updateCallback === 'function') {
                        status.updateCallback({...article, content})
                    }
                    message.success("Sửa bài thành công!")
                    closeArticleModal()
                })
            }

        }
    }
    const updateByEditing = () => {
        const {title, book, type, content} = article
        console.info('9779 s', article)
        form.setFieldsValue({title, book: book._id, type})
        const contentBox = contentRef.current
        
        // if (contentBox) {
        //     setTimeout(() => {
        //         contentBox.innerHTML = content
        //     }, 1000)
        // }
    }
    useEffect(() => {
        if (editMode) {
            console.info('9779 edit', contentRef)
            updateByEditing()
        }
    }, [status])
    return (
        <Modal bodyStyle={{ padding: 0 }} title={editMode ? t('Sửa bài') : t('Đăng bài mới')} visible={articleOpen} onOk={closeArticleModal} onCancel={closeArticleModal} width={800} footer={null}>
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
                    <Input addonBefore="Tiêu đề" disabled={editMode}/>
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
                        optionFilterProp="label"
                        options={bookList.map(book => ({ label: book.title, value: book._id }))}
                        disabled={editMode}
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
                        disabled={editMode}
                        style={{ width: "100%" }}
                    >
                        <Option value="Review">Review</Option>
                        <Option value="Discussion">Discussion</Option>
                        <Option value="QA">Question and Answer</Option>
                        <Option value="Others">Others</Option>
                    </Select>
                </Form.Item>
                <StyledContent placeholder="Nhấp vào đây để viết nội dung" ref={contentRef} contentEditable={true} onKeyDown={handleKeyDown} dangerouslySetInnerHTML={{ __html: editMode ? article?.content : getDraft() }} />
                <Form.Item shouldUpdate={true}>
                    {() => (
                        <Button type="primary"
                            htmlType="submit"
                            block
                            onClick={handlePost}
                            loading={posting}
                            disabled={
                                !editMode && (
                                    !form.isFieldsTouched(true) ||
                                    form.getFieldsError().filter(({ errors }) => errors.length).length > 0
                                    // !contentRef.current?.innerHTML?.trim()
                                )
                            }
                        >{editMode ? "Cập nhật" :"Đăng bài"}</Button>
                    )}

                </Form.Item>
            </Form>
        </Modal>
    )
}
export default withTranslation()(ArticleModal)

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