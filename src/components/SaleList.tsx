import React, { useEffect } from 'react'
import SaleItem from '@c/SaleItem'
import { List, Modal, message } from 'antd'

export interface ISaleList {
    list:  any[],
    setList: Function
    loading: boolean
}

const SaleList = (props: ISaleList) => {
    let {list, setList, loading} = props
    const deleteSale = index => {
        const {_id} = list[index]
        fetch(`/api/v1/article/${_id}`, {
            method: 'DELETE'
        }).then(res => {
            if (res.status === 200) {
                console.info('9779 delete', res)
                let newList = [...list]
                newList.splice(index, 1)
                setList(newList)
                message.success("Delete completely!")
            } else {
                message.error("Has something wrong!")
            }
        })
    }
    useEffect(() => {
        console.info('9779 list mount')
        return function () {
            console.info('9779 list unmount')
        }
    }, [])
    return (
        <List 
            loading={loading}
            locale={{ emptyText: "Không tìm thấy sách này trên chợ"}}
            dataSource={list}
            renderItem={(item, index) => (
                <SaleItem item={item}  onDelete={() => Modal.confirm({
                    title: 'Confirm',
                    content: 'Are you sure you want to delete?',
                    onOk: () => deleteSale(index)
                })}/>

            )}
        />
    )
}
export default SaleList
