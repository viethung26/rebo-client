import React, { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { LangProvider } from '@p/Lang'
import theme, { GlobalStyle } from '@p/UI/theme'
import Feed from '@m/Feed'
import { Router } from '@reach/router'
import Login from '@m/SignUpIn/Login'
import Signup from '@m/SignUpIn/Signup'
import Profile from '@m/Profile/Profile'
import Home from '@m/Layout'
import Test from 'Test'
import { useRecoilState } from 'recoil'
import { activeUserState } from 'stores'
import {io} from './sockets'
import ArticleModal from '@c/ArticleModal'
import NewBook from '@c/NewBook'
// import socket from 'socket.io-client'
// const ENDPOINT = 'http://localhost:3000'
// const io = socket.connect(ENDPOINT)

function App(props) {
	const [activeUser, setActiveUser] = useRecoilState(activeUserState)
	useEffect(() => {
		// io.emit('message', 'hi')
		if (!io.connected) {
			console.warn('9779 connect io')
			io.connect()
		}
		console.warn('9779 app mount')
		if (!activeUser) {
			fetch(`/api/v1/user/me`, {
				method: 'GET'
			}).then(res => res.json()
			).then(res => {
				if (res && !res.error) {
					setActiveUser(res)
				}
			})
		}
		return function () {
			console.warn('9779 app stop')
		}
	})
	return (
		<LangProvider>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<ArticleModal/>
            	<NewBook/>
				<Router>
					<Feed default path="/*" />
					<Login path="/login" />
					<Signup path="/signup" />
					<Profile path="/profile/:username" />
					{/* <Home path="/*" /> */}
					<Test path="/test" />
				</Router>


			</ThemeProvider>
		</LangProvider>
	)
}

export default App;
