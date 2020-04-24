import React, {Component} from 'react'
import styled from 'styled-components'
import ReactDOM from 'react-dom'
interface IConfigs {
    [key: string]: string
}
interface IWidget {
    open?: boolean
    configs?: IConfigs
    onClick?: () => void    
}

class UIWidget extends Component<IWidget> {
    static defaultProps = {
        open: false,
        configs: {
            bg: "rgba(0,0,0,0.5)"
        }
    }
    handleClick = (e: MouseEvent) => {
        const {onClick} = this.props
        if (e.target === e.currentTarget) {
            onClick && onClick()
        }
    }
    render() {
        const {open, configs, children} = {...UIWidget.defaultProps, ...this.props}
        if (!open) return null
        return ReactDOM.createPortal(
            <StyledWidget bg={configs.bg} onClickCapture={this.handleClick}>
                {children}
            </StyledWidget>,  document.body
        )
    }
}
export default UIWidget

const StyledWidget = styled.div<any>`
    width: 100vw;
    height: 100vh;
    z-index: 999;
    position: fixed;
    background-color: ${p => p.bg};
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`