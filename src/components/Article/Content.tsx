import styled from 'styled-components'
import React, { useState } from 'react'
import { withTranslation } from 'react-i18next'

const MAX_CONTENT_LENGTH = 300
const Content = (props: any) => {
    const [isExpanding, setExpanding] = useState(false)
    const {t} = props
    const content = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit, nam ipsam. Inventore qui aliquam rerum, iusto sequi necessitatibus ratione reprehenderit. Enim possimus recusandae quo rem commodi assumenda, dolorum inventore vel.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit, nam ipsam. Inventore qui aliquam rerum, iusto sequi necessitatibus ratione reprehenderit. Enim possimus recusandae quo rem commodi assumenda, dolorum inventore vel.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit, nam ipsam. Inventore qui aliquam rerum, iusto sequi necessitatibus ratione reprehenderit. Enim possimus recusandae quo rem commodi assumenda, dolorum inventore vel.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit, nam ipsam. Inventore qui aliquam rerum, iusto sequi necessitatibus ratione reprehenderit. Enim possimus recusandae quo rem commodi assumenda, dolorum inventore vel."
    const isCollapsed = content.length > MAX_CONTENT_LENGTH
    const expand = () => {
        setExpanding(true)
    }
    return (
        <StyledContent >
          <p>{isCollapsed && !isExpanding ? <>{content.substr(0, MAX_CONTENT_LENGTH)} <StyledMore onClick={expand}>{t('article.readmore')}</StyledMore></>: content}</p>
        </StyledContent>
    )
}
export default withTranslation()(Content)

const StyledContent = styled.div``
const StyledMore = styled.a`
    color: blue;
`