import React from 'react'
import styled from 'styled-components'
import { Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const Test = (props) => {
    return (
        <StyledTest>
              <Tooltip title="search">
                <Button type="primary" icon={<SearchOutlined />} />
                </Tooltip>
                <Button type="primary" shape="circle">
                A
                </Button>
                <Button type="primary" loading={{delay:3000}} icon={<SearchOutlined />}>
                Search
                </Button>
                <Tooltip title="search">
                <Button shape="circle" icon={<SearchOutlined />} />
                </Tooltip>
                <Button icon={<SearchOutlined />}>Search</Button>
                <br />
                <Tooltip title="search">
                <Button shape="circle" icon={<SearchOutlined />} />
                </Tooltip>
                <Button icon={<SearchOutlined />}>Search</Button>
                <Tooltip title="search">
                <Button type="dashed" shape="circle" icon={<SearchOutlined />} />
                </Tooltip>
                <Button type="dashed" icon={<SearchOutlined />}>
                Search
                </Button>
        </StyledTest>
    )
}
export default Test

const StyledTest = styled.div`
    margin: 16px;
`