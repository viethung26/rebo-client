import React, { useState } from 'react'
import { withTranslation } from 'react-i18next'
import NewPost from './NewPost'
import {Affix, Button} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
const ActionBar = (props) => {
    const [modal, setModal] = useState<boolean>(false)
    const handleClick = () => {
        setModal(true)
    }
    return (
        <>
            <Affix offsetTop={500} style={{position: 'absolute', top: 0, left: 0}}>
                <Button icon={<PlusOutlined />} size="large" onClick={handleClick}/>
            </Affix>
            <NewPost open={modal} closePost={() => setModal(false)}/>
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