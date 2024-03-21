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
import { BarChart, Download } from "lucide-react"
import { toast } from "sonner"
import { Progress } from "@/components/ui/progress"
import { DataProviderContext } from "@/components/data-provider"
import { useContext, useState } from "react"
import { POSTS_URL } from "@/lib/constants"

function DownloadPost({post}: {post: string}) {
    return (
        <Dialog>
            <DialogTrigger>
                <button className="rounded-lg bg-foreground w-6 h-6 flex items-center justify-center">
                    <Download color="white" width={16} height={16} />
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>{post}</DialogTitle>
                <DialogDescription>
                    <p>Это дейсвтие невозможно отменить.</p>
                </DialogDescription>
                <DialogFooter>
                    <Button variant={"outline"} onClick={() => {
                        console.log("account: ", post, ", was removed")
                        toast("Статус поста был изменен")
                    }}>Скачать</Button>
                </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

function UpdatePosts() {
    const dataContext = useContext(DataProviderContext);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);

    const handleSumbit = () => {
        setLoading(true)
        setProgress(50)

        fetch(POSTS_URL)
        .then(p => {
            if (p.status == 200) {
                p.json().then(json => {
                    dataContext?.setPosts(json)
                    setProgress(100)
                    toast("Успешно")
                }).catch(_ => {
                    setProgress(0)
                    toast("Ошибка веб-интерфейса")
                })
            } else {
                setProgress(0)
                toast("Ошибка от сервера")
            }
            setLoading(false)
        }).catch(e => {
            setProgress(0)
            toast("Сервер не отвечает")
            console.log(e)
            setLoading(false)
        })
    }

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
                    <Progress value={progress} />
                </div>
                <DialogFooter>
                    <Button disabled={isLoading}  variant={"outline"} className="w-full" onClick={handleSumbit}>Обновить</Button>
                </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default function Posts() {
    const dataContext = useContext(DataProviderContext);

    return (
        <div className="w-full max-h-[80vh] overflow-y-auto">
            <UpdatePosts />
            <Table>
                <TableCaption>Список постов.</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">Название</TableHead>
                        <TableHead className="text-right">Перейти</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {dataContext?.posts.map((post) => (
                    <TableRow key={post}>
                        <TableCell className="font-medium">{post}</TableCell>
                        <TableCell className="text-right">
                            <DownloadPost post={post} />
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Всего</TableCell>
                        <TableCell className="text-right">{dataContext?.posts.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}