import styled from 'styled-components'
import React, { useState } from 'react'
import { withTranslation } from 'react-i18next'

const MAX_CONTENT_LENGTH = 300
const Content = (props: any) => {
    const [isExpanding, setExpanding] = useState(false)
    const {t} = props
    const expand = () => {
        setExpanding(true)
    }
    let content = props.content || ""
    const isCollapsed = content.length > MAX_CONTENT_LENGTH
    content = isCollapsed && !isExpanding ? <>{content.substr(0, MAX_CONTENT_LENGTH)} <StyledMore onClick={expand}>{t('article.readmore')}</StyledMore></>: content
    
    return (
        <StyledContent >
          <p dangerouslySetInnerHTML={{__html: content}}/>
        </StyledContent>
    )
}
export default withTranslation()(Content)

const StyledContent = styled.div``
const StyledMore = styled.a`
    color: blue;
`