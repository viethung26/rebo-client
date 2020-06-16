import React, { useState } from 'react'
import styled from 'styled-components'
import { withTranslation } from 'react-i18next'
import { Button, Menu, Row, Col, Typography, Badge, Avatar } from 'antd'
import { BellOutlined } from '@ant-design/icons'
import Article from '@c/Article'
import { Link } from '@reach/router'
const enImage = '/static/en.png'
const viImage = '/static/vi.png'
// import viSvg from '@p/UI/vietnam.svg'
const { Text, Title } = Typography
const Header = (props: any) => {
    const { i18n } = props
    const [key, setKey] = useState('0')
    return (
        <StyledHeader gutter={16} justify="center" align="middle">
            <StyledCol span={6}>
                <Link to="/">
                    <Title type="warning">
                        REBO
                    </Title>
                </Link>
            </StyledCol>
            <StyledCol span={12}>
                <Menu mode="horizontal" selectedKeys={[key]} onSelect={({ item, key }) => setKey(key)}>
                    <Menu.Item key="0">
                        <Link to="/">Global</Link>
                    </Menu.Item>
                    <Menu.Item key="1">
                        <Link to="/interested">Interested</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        Custom
                    </Menu.Item>
                </Menu>
            </StyledCol>
            <StyledCol span={2}>
                <StyledLang>
                    {i18n.language === 'vi' ? <Button onClick={() => i18n.changeLanguage('en')}><img src={viImage} alt="vi" /></Button> :
                        <Button onClick={() => i18n.changeLanguage('vi')}><img src={enImage} alt="en" /></Button>}
                </StyledLang>
            </StyledCol>
            <StyledCol span={2}>
                <Badge count={3}>
                    <BellOutlined style={{ fontSize: "32px" }} />
                </Badge>
            </StyledCol>
            <StyledCol span={2}>
                <Link to="/profile/me">
                    <StyledLogo>
                        <Avatar size="large" src="https://i1.wp.com/meovatcuocsong.vn/wp-content/uploads/2018/06/anh-dai-dien-facebook-de-thuong5.jpg?w=770&ssl=1" />
                    </StyledLogo>
                </Link>

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
    > * {height: 100%}
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`