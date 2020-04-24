import React from 'react'
import { ThemeProvider} from 'styled-components'
import {LangProvider} from '@p/Lang'
import theme, { GlobalStyle } from '@p/UI/theme'
import Home from 'Home'
import { Router } from '@reach/router'
import Login from 'Login'
import Global from 'Feed/Global'
import Book from 'Feed/Book'
import Signup from 'Signup'
import Profile from 'Profile'
function App() {
	return (
		<LangProvider>
			<ThemeProvider theme={theme}>
				<GlobalStyle/>
				<Router>
					<Home path="/"/>
					<Login path="/login"/>
					<Signup path="/signup"/>
					<Profile path="/profile/:name"/>
				</Router>

				
			</ThemeProvider>
		</LangProvider>
	)
}

export default App;
