import React, { useContext } from 'react'
import { LangContext } from '.'
interface IText {
    string: string
}
interface IStringObject {
    [key: string]: string
}
const vi: IStringObject = {
    like: 'Thích',
    dislike: 'Chán',
    share: 'Chia sẻ',
    read_more: 'Xem thêm'
}
const en: IStringObject = {
    like: 'Like',
    dislike: 'Dislike',
    share: 'Share',
    read_more: 'Read more'
}
const getTextBykey = (key: string, lang = 'vi') => {
    return (lang === 'vi' ? vi[key] : en[key]) || key
}
const Text = (props: IText) => {
    const {lang} = useContext(LangContext)
    const {string: key} = props
    const renderText = getTextBykey(key, lang)
    return (
        <>{renderText}</>
    )
}
export default Text