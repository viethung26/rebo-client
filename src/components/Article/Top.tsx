import React from 'react'
import styled from 'styled-components'

const Top = () => {
    return (
        <StyledTop >
            <h2>Tieu d</h2>
            <StyledAvatar disableVendorPrefixes>
                <img src="https://i1.wp.com/meovatcuocsong.vn/wp-content/uploads/2018/06/anh-dai-dien-facebook-de-thuong5.jpg?w=770&ssl=1" alt="avt"/>
            </StyledAvatar>
        </StyledTop>
    )
}
export default Top


const StyledTop = styled.div<any>`
    display: flex;
    width: 100%;
    background-color: #ddd;
    > h2 {
        flex: 1 1 80%;
    }
`
const StyledAvatar = styled.div<any>`
    flex: 0 0 20%;
    > img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`
