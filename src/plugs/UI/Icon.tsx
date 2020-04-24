import React from 'react'
import styled from 'styled-components'

interface IIcon {
    name: string
}
interface IIconObject {
    [key: string]: any
}
const ICONS: IIconObject = {
    add: <path d="M22,1H2A1,1,0,0,0,1,2V22a1,1,0,0,0,1,1H22a1,1,0,0,0,1-1V2A1,1,0,0,0,22,1ZM18,13H13v5H11V13H6V11h5V6h2v5h5Z"></path>
}

const UIIcon = (props: IIcon) => {
    const {name} = props
    const icon = ICONS[name]
    return (
        <StyledIcon viewBox="0 0 24 24" width={"24px"} height={"24px"}>
            {icon}
        </StyledIcon>
    )
}
export default UIIcon

const StyledIcon = styled.svg`
`