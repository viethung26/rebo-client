import React, { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { LangProvider } from '@p/Lang'
import theme, { GlobalStyle } from '@p/UI/theme'
import Feed from '@m/Feed'
import { Router, navigate } from '@reach/router'
import Login from '@m/SignUpIn/Login'
import Signup from '@m/SignUpIn/Signup'
import Profile from '@m/Profile/Profile'
import Home from '@m/Layout'
import Test from 'Test'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { activeUserState, favoriteModalState, bookListState, categoriesState } from 'stores'
import { io } from './sockets'
import ArticleModal from '@c/ArticleModal'
import NewBook from '@c/NewBook'
import Market from '@m/Market'
import FavoriteModal from '@c/FavoriteModal'
import BookList from '@m/BookList'
import { Affix } from 'antd'
import Header from '@c/Header'
import ProfileSettingModal from '@c/ProfileSettingModal'
// import socket from 'socket.io-client'
// const ENDPOINT = 'http://localhost:3000'
// const io = socket.connect(ENDPOINT)

function App(props) {
	const [activeUser, setActiveUser] = useRecoilState(activeUserState)
	const setFavoriteModal = useSetRecoilState(favoriteModalState)
	const [bookList, setBookList] = useRecoilState(bookListState)
	const [categories, setCategories] = useRecoilState(categoriesState)
	useEffect(() => {
		fetch("/api/v1/book?populates=[{\"path\":\"rates\" }]", {
			method: "GET"
		}).then(res => res.json())
			.then(res => {
				setBookList(res)
			})
		fetch("/api/v1/category/", {
			method: "GET"
		}).then(res => res.json())
			.then(res => {
				setCategories(res)
			})
	}, [])
	useEffect(() => {
		if (activeUser && activeUser.categories.length === 0) {
			setFavoriteModal(true)
		}
	}, [activeUser])
	useEffect(() => {
		// io.emit('message', 'hi')
		if (!io.connected) {
			console.warn('9779 connect io')
			io.connect()
		}
		console.warn('9779 app mount')
		if (!activeUser) {
			fetch(`/api/v1/user/me`, {
				method: 'GET',
				cache: "no-cache"
			}).then(res => {
				if (res.status !== 200) {
					navigate("/login")
				}
				return res.json()
			}
			).then(res => {
				if (res && !res.error) {
					setActiveUser(res)
				}
			})
		}
		return function () {
			console.warn('9779 app stop')
		}
	}, [])
	return (
		<LangProvider>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<FavoriteModal />
				<ArticleModal />
				<ProfileSettingModal user={activeUser}/>
				<NewBook />
				<Router style={{height: '100%'}}>
					<Feed path="/*" />
					<Login path="/login" />
					<Signup path="/signup" />
					<Profile path="/profile/:username" user={activeUser} />
					{/* <Home path="/*" /> */}
					<Test path="/test" />
					<Market path="/market/*" user={activeUser} />
					<BookList path="/books/*" user={activeUser} />
				</Router>


			</ThemeProvider>
		</LangProvider>
	)
}

export default App;
