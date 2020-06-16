import React from 'react'
import { Modal, Form, Input, Select, Button, Alert } from 'antd'
import { withTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'
import { addBookOpenState } from 'stores'
const NewBook = (props) => {
    const [form] = Form.useForm()
    const [open, setOpen] = useRecoilState(addBookOpenState)
    const { t } = props
    const { Option } = Select
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
                        optionLabelProp="test"
                        showSearch allowClear
                        style={{ width: "100%" }}
                    >
                        <Option value="Văn học">Văn học</Option>
                        <Option value="2">Phát triển bản thân</Option>
                        <Option value="3">Ngoại ngữ</Option>
                        <Option value="4">Thể loại khác</Option>
                    </Select>
                </Form.Item>
                <Form.Item shouldUpdate={true}>
                    {() => (
                        <Button type="primary"
                            htmlType="submit"
                            block
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