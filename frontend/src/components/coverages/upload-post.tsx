import { ADD_COVERAGE_URL, CHECK_URL } from "@/lib/constants";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { DataProviderContext } from "@/components/data-provider";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useContext, useState } from "react";

export default function UploadPost() {
    const [file, setFile] = useState<File | null>(null);
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

        fetch(ADD_COVERAGE_URL, {
            method: 'POST',
            body: formData,
        }).then(p => {
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

    const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0])
        }
    } 

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"} className="w-full">
                    Добавить пост
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Выбор аккаунтов</DialogTitle>
                <DialogDescription>
                    Это действие невозможно отменить.
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