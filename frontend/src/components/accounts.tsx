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
import { Copy, CopyIcon, X } from "lucide-react"
import { toast } from "sonner"
import { Progress } from "@/components/ui/progress"
import { useContext, useState } from "react"
import { DataProviderContext } from "./data-provider"
import { CHECK_URL } from "@/lib/constants"
import { Label } from "@/components/ui/label"

function RemoveAccountDialog({account}: any) {
    return (
        <Dialog>
            <DialogTrigger>
                <Copy width={16} height={16} />
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                <DialogTitle>Токен</DialogTitle>
                <DialogDescription>
                    Вы можете скопировать чтобы использовать это в будущем
                </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                    <Label htmlFor="link" className="sr-only">
                        Link
                    </Label>
                    <Input
                    id="link"
                    defaultValue={account.token}
                    readOnly
                    />
                </div>
                <Button type="submit" size="sm" className="px-3"
                onClick={() => {navigator.clipboard.writeText(account.token)}}>
                    <span className="sr-only">Copy</span>
                    <CopyIcon className="h-4 w-4" />
                </Button>
                </div>
                <DialogFooter className="sm:justify-start">
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function AACDialog() {
    const [file, setFile] = useState<File | null>(null);
    const dataContext = useContext(DataProviderContext);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);

    const handleSumbit = () => {
        if (!file) {
            toast("Выберите файл")
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        console.log(file)

        setLoading(true)
        setProgress(50)

        fetch(CHECK_URL, {
            method: 'POST',
            body: formData,
        }).then(p => {
            if (p.status == 200) {
                p.json().then(json => {
                    dataContext?.setAccounts(json)
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

    const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0])
        }
    } 

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"} className="w-full">
                    Добавить и проверить аккаунты
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Выбор аккаунтов</DialogTitle>
                <DialogDescription>
                    Это действие невозможно отменить. После загрузки мы проверим эти аккаунты на блокировку
                </DialogDescription>
                <div className="space-y-4">
                    <Input onChange={handleFileSelected} id="file" type="file" name="Выбор файла" />
                    <Progress value={progress} />
                </div>
                <DialogFooter>
                    <Button disabled={isLoading} variant={"outline"} className="w-full" onClick={handleSumbit}>Добавить</Button>
                </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default function Accounts() {
    const dataContext = useContext(DataProviderContext)

    return (
        <div className="w-full max-h-[80vh] overflow-y-auto">
            <AACDialog />
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