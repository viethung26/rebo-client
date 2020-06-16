import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Table, Button } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { useRecoilState } from 'recoil';
import { TestAtom } from 'stores/Test';

interface User {
  key: number,
  name: string;
  age: number
}

const columns: ColumnProps<User>[] = [{
  key: 'name',
  title: <p title="Name ab">Name</p>,
  dataIndex: 'name',
},
    {
        key: 'age',
        title: 'Age',
        dataIndex: 'age',
        sorter: (a, b) => a.age - b.age,
    }
];

const data: User[] = [{
  key: 0,
  name: 'Jack',
  age: 20
},
{
    key: 1,
    name: 'Hung',
    age: 22
  }
];
const Test = (props) => {
    const [save1, setS1] = useState(0)
    const [save2, setS2] = useState(2)
    useEffect(() => {
      console.info('9779 effect')
    })
    const increase = () => {
      setS1(save1+1)
      setS2(save2+1)
    }
    return (
        <StyledTest>
          <p onClick={increase}>sav1: {save1}</p>
          <p>sav2: {save2}</p>
          <Table<User> dataSource={data} columns={columns}>
            {/* <Table.Column<User> key="name" title="Name" dataIndex="name" />
            <Table.Column<User> key="age" title="Age" dataIndex="age" sorter={(a, b) => a.age - b.age}/> */}
        </Table>
            <Button> adsfijoasdfj</Button>
            <Button type="primary"> adsfijoasdfj</Button>
        </StyledTest>
    )
}
export default Test

const StyledTest = styled.div`
    margin: 16px;
`