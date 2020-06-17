import {atom, selector, selectorFamily } from 'recoil'
const activeUserState = atom({
    key: 'activeUser',
    default: undefined
})
//
const addBookOpenState = atom({
    key: 'addBookOpen',
    default: false
})
const articleModalOpenState = atom({
    key: 'articleModalOpen',
    default: false
})
const articleModalStatusState = atom({
    key: 'articleModalStatus',
    default: {
        isEditing: false,
        article: null,
        updateCallback: null
    }
})
//
const bookListState = atom({
    key: 'bookList',
    default: []
})
// article state
const articleListState = atom({
    key: 'articleList',
    default: []
})
const bookArticlesState = atom({
    key: 'bookArticles',
    default: []
})
const myArticlesState = atom({
    key: 'myArticles',
    default: []
})
// const bookArticlesStateNew = selectorFamily({
//     key: 'bookArticlesNew',
//     get: (slug: string) => async() => {
//         const result = await fetch(`/api/v1/article/book/${slug}`, {
//             method: "GET",
//         })
//         console.info('9779 result', result)
//         return result
//     }
// })


export {
    articleModalStatusState,
    addBookOpenState,
    bookListState,
    articleModalOpenState,
    articleListState,
    activeUserState,
    myArticlesState,
    bookArticlesState,
}