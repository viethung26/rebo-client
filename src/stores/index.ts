import {atom, selector} from 'recoil'
const activeUserState = atom({
    key: 'activeUser',
    default: undefined
})
const addBookOpenState = atom({
    key: 'addBookOpen',
    default: false
})
const articleModalOpenState = atom({
    key: 'articleModalOpen',
    default: false
})
const bookListState = atom({
    key: 'bookList',
    default: []
})

const articleListState = atom({
    key: 'articleList',
    default: []
})
const testState = atom({
    key: 'test',
    default: ''
})

export {
    addBookOpenState,
    bookListState,
    articleModalOpenState,
    articleListState,
    activeUserState,
    testState
}