import { COVERAGES_URL, POSTS_URL } from "@/lib/constants";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useContext, useState } from "react";
import { toast } from "sonner";
import { DataProviderContext } from "@/components/data-provider";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";

export default function UpdateCoverages() {
    const dataContext = useContext(DataProviderContext);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);

    const handleSumbit = () => {
        setLoading(true)
        setProgress(50)

        fetch(COVERAGES_URL)
        .then(p => {
            if (p.status == 200) {
                p.json().then(json => {
                    dataContext?.setCoverages(json)
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
                    Обновить отчеты
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Отчеты</DialogTitle>
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