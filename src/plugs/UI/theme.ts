import {DefaultTheme, createGlobalStyle} from 'styled-components'

const colors = {
    R0: "#f00",
    W5: "#555",
    G0:"#0BBE01",
    G1:"#109709",
    G2:"#0C7A07",
    G3:"#045500",
    G4: "#033200",
    D0: "#6F6B6E",
    D1: "#9F9A9E",
    D2: "#858184",
    D3: "#4F4C4E",
    D4: "#201F20",
}

const theme: DefaultTheme = {
    primary: colors.D0,
    secondary: colors.G2,
    tertiary: colors.G0
}

export default {...colors, ...theme}
export const GlobalStyle = createGlobalStyle`
    html * {
        box-sizing: border-box;
        font-family: 'Baloo 2', cursive;
    }
    :root {
        font-size: 16px;
    }

`