import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { useContext, useState } from "react"
import { DataProviderContext } from "./data-provider"
import CheckAccounts from "./accounts/check-accounts"
import RemoveAccountDialog from "./accounts/remove-account"


export default function Accounts() {
    const dataContext = useContext(DataProviderContext)

    return (
        <div className="w-full max-h-[80vh] overflow-y-auto">
            <CheckAccounts />
            <Table>
                <TableCaption>Список аккаунтов ВК.</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">Номер</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead className="text-right">Copy</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {dataContext?.accounts.map((account) => (
                    <TableRow key={account.phone_number}>
                        <TableCell className="font-medium">{account.phone_number}</TableCell>
                        <TableCell>{!account.status ? <p className="text-red-700">Блок</p> : "Доступен"}</TableCell>
                        <TableCell className="text-right">
                            <RemoveAccountDialog account={account} />
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Всего</TableCell>
                        <TableCell className="text-right">{dataContext?.accounts.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}