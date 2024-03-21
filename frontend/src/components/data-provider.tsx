import { Dispatch, SetStateAction, createContext, useState } from "react"

type ThemeProviderState = {
    accounts: Account[],
    setAccounts: Dispatch<SetStateAction<Account[]>>,
    posts: string[],
    setPosts: Dispatch<SetStateAction<string[]>>,
    coverages: string[],
    setCoverages: Dispatch<SetStateAction<string[]>>,
}

type Account = {
    phone_number: string,
    token: string,
    status: boolean
}

export const DataProviderContext = createContext<ThemeProviderState | null>(null)

export default function DataProvider({
    children
}: {children: React.ReactNode}) {
    const [accounts, setAccounts] = useState<Account[]>([])
    const [posts, setPosts] = useState<string[]>([])
    const [coverages, setCoverages] = useState<string[]>([])

    return (
        <DataProviderContext.Provider value={{
            accounts,
            setAccounts,
            posts,
            setPosts,
            coverages,
            setCoverages
        }}>
            {children}
        </DataProviderContext.Provider>
    )
}