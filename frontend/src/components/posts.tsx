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

import { Button } from "./ui/button"
import { BarChart } from "lucide-react"
import { toast } from "sonner"
import { Progress } from "@/components/ui/progress"

const posts = [
    {
        name: "детская  зубная щетка",
        status: false,
        views: 1000
    },
    {
        name: "зубная паста",
        status: true,
        views: 1212
    }
]

function UpdatePost({account}: any) {
    return (
        <Dialog>
            <DialogTrigger>
                <button className="rounded-lg bg-foreground w-6 h-6 flex items-center justify-center">
                    <BarChart color="white" width={16} height={16} />
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>{account.name}</DialogTitle>
                <DialogDescription>
                    <p>Это дейсвтие невозможно отменить.</p>
                    <p>Просмотры: {account.views}</p>
                </DialogDescription>
                <DialogFooter>
                    <Button variant={"outline"} onClick={() => {
                        console.log("account: ", account, ", was removed")
                        toast("Статус поста был изменен")
                    }}>{account.status ? "Отключить" : "Включить"}</Button>
                </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

function UpdatePosts() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                    Добавить и проверить посты
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Посты</DialogTitle>
                <DialogDescription>
                    Это действие будет невозможно отменить
                </DialogDescription>
                <div className="py-3">
                    <Progress value={40} />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={"outline"} className="w-full" onClick={() => {
                            toast("Accounts was added")
                        }}>Обновить</Button>
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
            <UpdatePosts />
            <Table>
                <TableCaption>Список постов.</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">Название</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead className="text-right">Перейти</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {posts.map((account) => (
                    <TableRow key={account.name}>
                        <TableCell className="font-medium">{account.name}</TableCell>
                        <TableCell>{account.status ? <p className="text-red-700">Отключен</p> : "Активен"}</TableCell>
                        <TableCell className="text-right">
                            <UpdatePost account={account} />
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Всего</TableCell>
                        <TableCell className="text-right">{posts.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}