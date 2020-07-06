import { Modal, Form, Input, Select, Button, Alert, Upload, message, Checkbox, Row, Col } from 'antd'
import React, { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { categoriesState, favoriteModalState, activeUserState } from 'stores'
import { withTranslation } from 'react-i18next'

const FavoriteModal = (props) => {
    const { t } = props
    const [posting, setPosting] = useState(false)
    const [activeUser, setActiveUser] = useRecoilState(activeUserState)
    const [open, setOpen] = useRecoilState(favoriteModalState)
    const categories = useRecoilValue(categoriesState)
    const [favorites, setFavorites] = useState(activeUser?.categories || [])
    const handlePost = () => {
        setPosting(true)
        fetch(`/api/v1/user/${activeUser._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ categories: favorites})
        }).then(res => {
            setPosting(false)
            if (res.status !== 200) {
                message.error("Cập nhật không thành công, xin vui lòng thử lại!")
            } else {
                message.success("Cập nhật thành công!")
            }
            return res.json()
        }).then(res => {
            setActiveUser(res)
            setOpen(false)
        })
    }
    useEffect(() => {
        if (activeUser?.categories) setFavorites(activeUser.categories)
    }, [activeUser])
    return (
        <Modal bodyStyle={{ padding: 0 }} title="Thể loại yêu thích" visible={open} onOk={() => setOpen(false)} width={800} closable={false} footer={null}>
            <Alert type="info" message="Chọn thể loại sách bạn yêu thích" />
            <Checkbox.Group value={favorites} onChange={setFavorites}>

                <Row gutter={[16,16]} style={{padding: 16}}>
                    {
                        categories.map(category => (
                            <Col span={8} key={category._id}>
                                <Checkbox value={category._id} >{category.name}</Checkbox>
                            </Col>
                        ))
                    }
                </Row>
            </Checkbox.Group>

            <Button type="primary"
                htmlType="submit"
                block
            onClick={handlePost}
            loading={posting}
            disabled={
                favorites.length === 0
            }
            >Cập nhật</Button>
        </Modal>
    )
}
export default withTranslation()(FavoriteModal)