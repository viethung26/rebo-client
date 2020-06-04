import React from 'react'
import styled from 'styled-components'
import NewPost from '@m/Layout/NewPost'
import Article from '@c/Article'

const Global = (props) => {
    return (
        <StyledGlobal>
            <NewPost/>
            <Article/>
            <Article/>
            <Article/>
            <Article/>
            <Article/>
        </StyledGlobal>
    )
}
export default Global

const StyledGlobal = styled.div``