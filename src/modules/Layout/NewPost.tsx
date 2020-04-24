import React, { useRef } from 'react'
import styled from 'styled-components'
import { withTranslation } from 'react-i18next'
import UIModal from '@p/UI/Modal'
import UIButton from '@p/UI/Button'
import {Modal, Button, Input, Select} from 'antd'
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
const getDraft = () => {
    return localStorage.getItem("REBO_DRAFT_CONTENT") || ""
}
const NewPost = (props: any) => {
    const textBoxRef = useRef(null)
    const handleKeyDown = (e) => {
        const key = e.key.toLowerCase()
        if (e.metaKey && keyMaps.includes(key)) {
            e.preventDefault()
            metaFunction(key)
        }
        saveDraft(textBoxRef?.current)
    }
    const { t, open, closePost } = props
    const {Option} = Select
    return (
        <Modal bodyStyle={{padding: 0}} title={t('New Post')} visible={open} onOk={closePost} onCancel={closePost} width={800} footer={null}>
            <Input addonBefore="Title"/>
            <Select optionLabelProp="test" showSearch allowClear style={{width: "100%"}}>
                <Option value="Think and grow rich">Think and grow rich</Option>
                <Option value="Ban khong thong minh lam dau">Ban khong thong minh lam dau</Option>
                <Option value="Nhan to enzyme">Nhan to enzyme</Option>
            </Select>
            <StyledContent ref={textBoxRef} contentEditable={true} onKeyDown={handleKeyDown} dangerouslySetInnerHTML={{__html: getDraft()}}/>
            <Button type="primary" block>Post</Button>
        </Modal>
    )
    return (
        <UIModal title={t('New Post')} open={open} clickOut={closePost}>
            <StyledContent ref={textBoxRef} contentEditable={true} onKeyDown={handleKeyDown} dangerouslySetInnerHTML={{__html: getDraft()}}/>
            <UIButton full>Post</UIButton>
         </UIModal>
    )
}
export default withTranslation()(NewPost)

const StyledContent = styled.div<any>`
    width: 100%;
    height: 500px;
    padding: 8px 16px;
    outline: none;
`