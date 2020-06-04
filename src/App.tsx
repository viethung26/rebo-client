import React from 'react'
import { ThemeProvider} from 'styled-components'
import {LangProvider} from '@p/Lang'
import theme, { GlobalStyle } from '@p/UI/theme'
import Feed from '@m/Feed'
import { Router } from '@reach/router'
import Login from '@m/SignUpIn/Login'
import Signup from '@m/SignUpIn/Signup'
import Profile from '@m/Profile/Profile'
import Test from 'Test'
function App() {
	return (
		<LangProvider>
			<ThemeProvider theme={theme}>
				<GlobalStyle/>
				<Router>
					<Feed path="/"/>
					<Login path="/login"/>
					<Signup path="/signup"/>
					<Profile path="/profile/:name"/>
					<Test path="/test"/>
				</Router>

				
			</ThemeProvider>
		</LangProvider>
	)
}

export default App;
