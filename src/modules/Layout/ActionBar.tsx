import React from 'react'
import { withTranslation } from 'react-i18next'
import {Affix, Button} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
const ActionBar = (props) => {
    const {addFn} = props
    const handleClick = () => {
        typeof addFn === 'function' && addFn()
    }
    return (
        <>
            <Affix offsetTop={500} style={{position: 'absolute', top: 0, left: 0}}>
                <Button icon={<PlusOutlined />} size="large" onClick={handleClick}/>
            </Affix>
        </>
    )
}
export default withTranslation()(ActionBar)

// const StyledActionBar = styled.div`
//     position: fixed;
//     top: 40%;
//     left: 0;
//     border: 1px solid black;
// `