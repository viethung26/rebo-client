import React from 'react'
import styled from 'styled-components'
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';

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
    return (
        <StyledTest>
          <Table<User> dataSource={data} columns={columns}>
            {/* <Table.Column<User> key="name" title="Name" dataIndex="name" />
            <Table.Column<User> key="age" title="Age" dataIndex="age" sorter={(a, b) => a.age - b.age}/> */}
        </Table>

        </StyledTest>
    )
}
export default Test

const StyledTest = styled.div`
    margin: 16px;
`