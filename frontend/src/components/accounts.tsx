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

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { toast } from "sonner"
import { Progress } from "@/components/ui/progress"

const accounts = [
    {
      number: "71293812093",
      isBlocked: false,
    },
    {
        number: "7123913211",
        isBlocked: true,
    }
]

function RemoveAccountDialog({account}: any) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="rounded-lg bg-red-500">
                    <X color="white" width={20} height={20} />
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Вы абсолютно уверенны?</DialogTitle>
                <DialogDescription>
                    Это дейсвтие невозможно отменить. Это действие перманентно удалит этот аккаунт и данные с наших серверов
                </DialogDescription>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={"destructive"} onClick={() => {
                            console.log("account: ", account, ", was removed")
                            toast("Account was removed")
                        }}>Удалить</Button>
                    </DialogClose> 
                </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

function AACDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                    Добавить и проверить аккаунты
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Выбор аккаунтов</DialogTitle>
                <DialogDescription>
                    Это дейсвтие невозможно отменить. После загрузки мы проверим эти аккаунты на блокировку
                </DialogDescription>
                <div className="space-y-4">
                    <Input id="accfiles" type="file" name="Выбор файла" />
                    <Progress value={40} />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={"outline"} className="w-full" onClick={() => {
                            toast("Аккаунты были добавленны")
                        }}>Добавить</Button>
                    </DialogClose>
                </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default function Accounts() {
    return (
        <div className="w-full">
            <AACDialog />
            <Table>
                <TableCaption>Список аккаунтов ВК.</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">Номер</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead className="text-right">Удалить</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {accounts.map((account) => (
                    <TableRow key={account.number}>
                        <TableCell className="font-medium">{account.number}</TableCell>
                        <TableCell>{account.isBlocked ? <p className="text-red-700">Блок</p> : "Доступен"}</TableCell>
                        <TableCell className="text-right">
                            <RemoveAccountDialog account={account} />
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Всего</TableCell>
                        <TableCell className="text-right">{accounts.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}