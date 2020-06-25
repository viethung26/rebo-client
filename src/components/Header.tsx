import React, { useState } from 'react'
import styled from 'styled-components'
import { withTranslation } from 'react-i18next'
import {  Menu, Row, Col, Typography, Badge, Avatar, Affix, Space } from 'antd'
import { BellOutlined, GlobalOutlined, HeartOutlined, BookOutlined, ShopOutlined, FireOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Link, useLocation, useParams, navigate } from '@reach/router'
import { activeUserState } from 'stores'
import { useSetRecoilState } from 'recoil'
// const enImage = '/static/en.png'
// const viImage = '/static/vi.png'
// // import viSvg from '@p/UI/vietnam.svg'

const { Text, Title } = Typography
const Header = (props: any) => {
    const setActiveUser = useSetRecoilState(activeUserState)
    const { i18n, user } = props
    const location = useLocation()
    const param = useParams()
    const {pathname} = location
    const [key, setKey] = useState(pathname)
    const handleLogout = () => {
        fetch("api/v1/user/logout").then(res => {
            if (res.status === 200) {
                setActiveUser(null)
                navigate("/login")
            }
        })
    }
    return (
        <StyledHeader gutter={16} justify="center" align="middle">
            <StyledCol xxl={8} xl={6} lg={6} md={2} sm={0} xs={0}>
                <Link to="/">
                    <Title type="warning">
                        REBO
                    </Title>
                </Link>
            </StyledCol>
            <StyledCol xxl={8} xl={12} lg={12} md={20} sm={24} xs={24}>
                <Menu mode="horizontal" selectedKeys={[key]} onSelect={({ item, key }) => setKey(key)}>
                    <Menu.Item key="/">
                        <Link to="/"><GlobalOutlined style={{fontSize: 20}}/></Link>
                    </Menu.Item>
                    <Menu.Item key="/trend">
                        <Link to="/trend"><FireOutlined style={{fontSize: 20}}/></Link>
                    </Menu.Item>
                    <Menu.Item key="/interested">
                        <Link to="/interested"><HeartOutlined style={{fontSize: 20}}/></Link>
                    </Menu.Item>
                    <Menu.Item key="/books">
                        <Link to="/books"><BookOutlined style={{fontSize: 20}}/></Link>
                    </Menu.Item>
                    <Menu.Item key="/market">
                        <Link to="/market"><ShopOutlined style={{fontSize: 20}}/></Link>
                    </Menu.Item>
                </Menu>
            </StyledCol>

            <StyledCol xxl={8} xl={6} lg={6} md={2} sm={0} xs={0} style={{textAlign: 'right'}}>
                <Space>
                    {/* <Badge count={0}>
                        <BellOutlined style={{ fontSize: "32px" }} />
                    </Badge> */}
                    <Link to={`/profile/${user?.username}`}>
                        <StyledLogo>
                            <Avatar size="large" icon={<UserOutlined />} src={user?.avatar} />
                        </StyledLogo>
                    </Link>
                    <LogoutOutlined style={{ fontSize: "32px" }} onClick={handleLogout}/>
                </Space>


            </StyledCol>
        </StyledHeader>
    )
}
export default withTranslation()(Header)

const StyledHeader = styled(Row)`
    width: 100%;
    height: 80px;
    background-color: #3b3b3b;
    color: white;
    overflow: hidden;
    padding: 16px;
`
const StyledCol = styled(Col)`
    max-height: 100%;
`
const StyledLogo = styled.div`
    width: 100px;
    height: 100%;
    overflow: hidden;
    >img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`
const StyledLang = styled.a`
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`