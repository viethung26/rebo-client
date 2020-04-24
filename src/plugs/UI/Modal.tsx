import React, {Component} from 'react'
import styled from 'styled-components'
import UIWidget from './Widget'

interface IModal {
    title: string
    open?: boolean
    clickIn?: () => void
    clickClose?: () => void    
    clickOut?: () => void  
    size?: "small" | "normal" | "large",
    styles?: {}
}

const SIZES: {[key: string]: number} = {
    small: 500,
    normal: 900,
    large: 1200
}

class UIModal extends Component<IModal> {
    static defaultProps = {
        open: false,
        size: "normal",
        styles: {
            "border-radius": "4px"
        }
    }
    handleClick = (e: MouseEvent) => {
        const {clickIn} = this.props
        clickIn && clickIn()
    }
    getStyleString = () => {
        const {styles} = this.props
        return Object.keys(styles).map(k => `${k}: ${styles[k]}`).join(";").concat(";")
    }
    render() {
        const {title, open, clickClose, clickOut, size, children} = this.props
        return <UIWidget open={open} onClick={clickOut}>
            <StyledModal onClick={this.handleClick} w={SIZES[size]} styles={this.getStyleString()}>
                <StyledHeader>{title}<StyledCloseButton onClick={clickClose || clickOut}>&times;</StyledCloseButton></StyledHeader>
                {children}
            </StyledModal>
        </UIWidget>
    }
}
export default UIModal

const StyledModal = styled.div<any>`
    width: ${p => p.w}px;
    background-color: ${p => p.theme.primary};
    overflow: hidden;
    ${p => p.styles}
`
const StyledHeader = styled.div<any>`
    position: relative;
    width: 100%;
    height: 64px;
    border-bottom: 1px solid white;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: white;
`
const StyledCloseButton = styled.span`
    position: absolute;
    right: 16px;
    border-radius: 100%;
    background-color: #888;
    height: 36px;
    width: 36px;
    &:hover {
        background-color: #aaa;
    }
    cursor: pointer;
`