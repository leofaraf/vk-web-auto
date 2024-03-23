import { CREATE_COVERAGE, CREATE_POST_URL } from "@/lib/constants";
import { useContext, useState } from "react";
import { toast } from "sonner";
import { DataProviderContext } from "@/components/data-provider";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CreateCoverages() {
    const dataContext = useContext(DataProviderContext);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [file, setFile] = useState<File | null>(null);

    const handleSumbit = () => {
        if (!file) {
            toast("Выберите файл")
            return;
        }

        const formData = new FormData()
        formData.append("file", file)

        setLoading(true)
        setProgress(50)

        fetch(CREATE_COVERAGE, {
            method: "POST",
            body: formData,
        })
        .then(p => {
            if (p.status == 200) {
                setProgress(100)
                toast("Успешно. Скачайте последний результат")
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
                <Button variant="outline" className="w-full">
                    Создать отчет
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
                    <Input onChange={handleFileSelected} id="file" type="file" name="Выбор файла" />
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