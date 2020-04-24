import React, { useState, ReactNode } from "react"

export const LangContext = React.createContext({lang: 'vi', changeLanguage: (lg: string) => {}})
export default {
    // LangProvider: LangContext.Provider,
}
interface ILang {
    children?: React.ReactNode
}
type IL = { children?: ReactNode;}

export const LangProvider = (props: ILang) => {
    const [lang, setLang] = useState('vi')
    const changeLanguage = (lg: string) => setLang(lg)
    return <LangContext.Provider value={{lang, changeLanguage}}>
        {props.children}
    </LangContext.Provider>
}