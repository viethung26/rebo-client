import React, { useState } from 'react'
import { Modal, Form, Input, Button, message } from 'antd'
import { withTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'
import {  profileSettingModalState } from 'stores'
const ProfileModal = (props) => {
    const {user} = props
    const [form] = Form.useForm()
    const [open, setOpen] = useRecoilState(profileSettingModalState)
    const [posting, setPosting] = useState(false)
    const closeModal = () => {
        setOpen(false)
    }
    const handlePost = () => {
        if (form.isFieldsTouched(true) && form.getFieldsError().filter(({ errors }) => errors.length).length === 0) {
            const displayname = form.getFieldValue("displayname")
            const avatar = form.getFieldValue("avatar")
            setPosting(true)
                fetch(`/api/v1/user/${user._id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ displayname, avatar })
                }).then(res => {
                    setPosting(false)
                    if (res.status === 200) {
                        message.success("Cập nhật thành công!")
                    } else {
                        message.success("Cập nhật thất bại!")
                    }
                    return res.json()
                }).then(res => {
                    closeModal()
                })

        }
    }
    return (
        <Modal bodyStyle={{ padding: 0 }} title={"Thiết lập tài khoản"} visible={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)} width={800} footer={null}>
            <Form form={form} name="article">
                <Form.Item
                    name="displayname"
                    initialValue={user?.displayname}
                >
                    <Input placeholder="Tên hiển thị"/>
                </Form.Item>
                <Form.Item
                    name="avatar"
                    initialValue={user?.avatar}                    
                >
                    <Input placeholder="Đường dẫn ảnh đại diện" />
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
                        >Cập nhật</Button>
                    )}
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default withTranslation()(ProfileModal)