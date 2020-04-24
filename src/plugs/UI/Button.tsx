import React from 'react'
import styled from 'styled-components'
import UIICon from './Icon'
const UIButton = (props: any) => {
    const {icon, onClick, full, children} = props
    return (
        <StyledButton onClick={onClick} full={full}>
            {icon && <UIICon name={icon}/>}
            {children}
        </StyledButton>
    )
}
export default UIButton

UIButton.defaultProps = {
    full: false
}
const StyledButton = styled.button<any>`
    --webkit-appearance: none;
    outline: none;
    padding: 8px;
    border-radius: 4px;
    ${p => p.full && "width: 100%;"}
`