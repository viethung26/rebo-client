import React from 'react'
import { Affix, List, Row, Col } from 'antd'
import Header from '@c/Header'
import { Router } from '@reach/router'
import AllBook from './AllBook'
import Recommendation from './Recommendation'

const BookList = (props) => {
    const { user } = props
    
    return (
        <>
            <Affix offsetTop={0}>
                <Header user={user} />
            </Affix>
            <Row justify="center" align="middle">
                <Col xxl={8} xl={12} lg={16}>
                    <Router>
                        <AllBook path="/"/>
                        <Recommendation path="/recommendation" />
                    </Router>
                </Col>
            </Row>

        </>
    )
}
export default BookList