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

// categories
const categoriesState = atom({
    key: 'categories',
    default: []
})

// books
const bookListState = atom({
    key: 'bookList',
    default: []
})
const recommendBooksState = atom({
    key: 'recommendBooks',
    default: []
})

// market item
const saleListState = atom({
    key: 'saleList',
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
const trendArticlesState = atom({
    key: 'trendArticles',
    default: []
})
const interestedArticlesState = atom({
    key: 'interestedArticles',
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
// Favorite modal
const favoriteModalState = atom({
    key: 'favoriteModal',
    default: false
})

const profileSettingModalState = atom({
    key: 'profileSettingModal',
    default: false
})
const itemModalState = atom({
    key: 'itemModal',
    default: false
})

export {
    articleModalStatusState,
    addBookOpenState,
    bookListState,
    recommendBooksState,
    articleModalOpenState,
    articleListState,
    activeUserState,
    myArticlesState,
    trendArticlesState,
    interestedArticlesState,
    bookArticlesState,
    categoriesState,
    saleListState,
    favoriteModalState,
    profileSettingModalState,
    itemModalState
}