import React from 'react'
import styled from 'styled-components'
import NewPost from '@m/Layout/NewPost'
import Article from '@c/Article'
import ActionBar from '@m/Layout/ActionBar'
import Header from 'Header'
import {Affix} from 'antd'
import { Router } from '@reach/router'
import Global from 'Feed/Global'
import Book from 'Feed/Book'
import Profile from 'Profile'

const Home = (props) => {
    return (
        <StyledHome>
            <Affix offsetTop={0}>
                <Header/>
            </Affix>
            <StyledApp>
                <div/>
                <div>
                    <Router>
						<Global path="/"/>
						<Book path="/book/:name"/>
                    </Router>
                    {/* <Profile path="/profile/:account"/> */}
                </div>
                <div/>
            </StyledApp>
            <ActionBar/>
        </StyledHome>
    )
}
export default Home

const StyledHome = styled.div``


const StyledApp = styled.div`
	display: grid;
	grid-template-columns: 1fr 2fr 1fr;
`
