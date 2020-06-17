import React, { useEffect } from 'react'
import styled from 'styled-components'
import ActionBar from '@m/Layout/ActionBar'
import Header from '@c/Header'
import { Affix } from 'antd'
import { Router } from '@reach/router'
import Global from '@m/Feed/Global'
import Book from '@m/Feed/Book'
import Profile from '@m/Profile/Profile'
import { useRecoilState } from 'recoil'
import { bookListState } from 'stores'

const Home = (props) => {
    const [bookList, setBookList] = useRecoilState(bookListState)
    useEffect(() => {
        if (bookList.length === 0) {
            fetch("/api/v1/book/", {
                method: "GET"
            }).then(res => res.json())
            .then(res => {
                setBookList(res)
            })
        }
        return function() {
            console.info('9779 dismount')
        }
    }, [])
    return (
        <StyledHome>
            <Affix offsetTop={0}>
                <Header />
            </Affix>
            <StyledApp>
                <div />
                <div>
                    <Router>
                        <Global path="/" />
                        <Book path="/book/:slug" />
                    </Router>
                    {/* <Profile path="/profile/:account"/> */}
                </div>
                <div />
            </StyledApp>
            <ActionBar />
        </StyledHome>
    )
}
export default Home

const StyledHome = styled.div``


const StyledApp = styled.div`
	display: grid;
	grid-template-columns: 1fr 2fr 1fr;
`
