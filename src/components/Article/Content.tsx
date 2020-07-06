import styled from 'styled-components'
import React, { useState } from 'react'
import { withTranslation } from 'react-i18next'

const MAX_CONTENT_LENGTH = 400
const Content = (props: any) => {
    const [isExpanding, setExpanding] = useState(false)
    const {t} = props
    const expand = () => {
        setExpanding(true)
    }
    let content = props.content || ""
    const isCollapsed = content.length > MAX_CONTENT_LENGTH
    if (isCollapsed && !isExpanding) {
        content = content.substr(0, MAX_CONTENT_LENGTH)
    }
    
    return (
        <StyledContent >
          <p dangerouslySetInnerHTML={{__html: content}}/>
          {isCollapsed && !isExpanding && <StyledMore onClick={expand}>Xem thêm</StyledMore>}
        </StyledContent>
    )
}
export default withTranslation()(Content)

const StyledContent = styled.div`
    img {
        width: 100%;
    }
`
const StyledMore = styled.a`
    color: black;
    font-weight: bold;
    cursor: pointer;
`