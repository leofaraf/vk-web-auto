import { CREATE_POST_URL } from "@/lib/constants";
import { useContext, useState } from "react";
import { toast } from "sonner";
import { DataProviderContext } from "@/components/data-provider";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CreatePost() {
    const dataContext = useContext(DataProviderContext);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [txt, setTxt] = useState<File | null>(null);
    const [xlsx, setXslx] = useState<File | null>(null);

    const handleSumbit = () => {
        if (!txt || !xlsx) {
            toast("Выберите файлы")
            return;
        }

        const formData = new FormData()
        formData.append("settings", txt)
        formData.append("request", xlsx)

        setLoading(true)
        setProgress(50)

        fetch(CREATE_POST_URL, {
            method: "POST",
            body: formData,
        })
        .then(p => {
            if (p.status == 200) {
                setProgress(100)
                toast("Успешно")
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

    const handleTxtSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setTxt(e.target.files[0])
        }
    }

    const handleXlsxSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setXslx(e.target.files[0])
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                    Создать пост
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Создание</DialogTitle>
                <DialogDescription>
                    Это действие будет невозможно отменить. Ожидание может занять несколько минут
                </DialogDescription>
                <div className="py-3 space-y-2">
                    <p className="text-sm ">Настройки (.txt)</p>
                    <Input  onChange={handleTxtSelected} id="file" type="file" name="Выбор файла" />
                    <p className="text-sm ">Настройки (.xlsx)</p>
                    <Input onChange={handleXlsxSelected} id="file" type="file" name="Выбор файла" />
                    <Progress value={progress} />
                </div>
                <DialogFooter>
                    <Button disabled={isLoading}  variant={"outline"} className="w-full" onClick={handleSumbit}>Запустить</Button>
                </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}