import React, { useEffect } from 'react'
import styled from 'styled-components'
import ActionBar from '@m/Layout/ActionBar'
import Header from '@c/Header'
import { Affix, Row, Col } from 'antd'
import { Router } from '@reach/router'
import Global from '@m/Feed/Global'
import Book from '@m/Feed/Book'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { bookListState, categoriesState, activeUserState, articleModalOpenState } from 'stores'
import Trend from './Trend'
import Interest from './Interest'

const Home = (props) => {
    const activeUser = useRecoilValue(activeUserState) || {}
    const setArticleModal = useSetRecoilState(articleModalOpenState)
    return (
        <>
            <Affix offsetTop={0}>
                <Header user={activeUser}/>
            </Affix>
            <Row justify="center" align="middle">
                <Col xxl={8} xl={12} lg={16}>
                    <Router>
                        <Global path="/" />
                        <Trend path="/trend" />
                        <Interest path="/interested" />
                        <Book path="/book/:slug" />
                    </Router>
                </Col>

            </Row>
            <ActionBar addFn={() => setArticleModal(true)}/>
        </>
    )
}
export default Home