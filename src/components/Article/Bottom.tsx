import React from 'react'
import styled from 'styled-components'
import { withTranslation } from 'react-i18next'
import {Button, Typography} from 'antd'
import {RiseOutlined, LikeFilled, DislikeFilled} from '@ant-design/icons'
const {Text} = Typography
const Bottom = (props: any) => {
    const {t} = props
    return (
        <StyledBottom>
            <StyledGroupButton>
                <RiseOutlined /><Text>10</Text> 
                {/* <Button>{t('react.like')}</Button> */}
                {/* <Button>{t('react.dislike')}</Button> */}
                <Button><LikeFilled /></Button>
                <Button><DislikeFilled /></Button>
                <Button>{t('react.comment')}</Button>
            </StyledGroupButton>
            {/* <input placeholder={t('react.comment')}/> */}
        </StyledBottom>
    )
}
export default withTranslation()(Bottom)
const StyledGroupButton = styled.div`
    span {
        margin-right: 4px;
    }
`
const StyledBottom = styled.div`
    >input {
        padding: 8px;
        width: 100%;
        &:focus {
            outline: none;
        }
    }
`