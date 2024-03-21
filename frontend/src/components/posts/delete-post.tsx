import { DELETE_POST_URL } from "@/lib/constants";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";

export default function DeletePost({post}: {post: string}) {
    const [isLoading, setLoading] = useState<boolean>(false);

    const handleSumbit = () => {
        setLoading(true)

        fetch(DELETE_POST_URL(post), {
            method: "DELETE"
        })
        .then(p => {
            if (p.status == 200) {
                toast("Успешно. Обновите посты")
            } else {
                toast("Ошибка. Возможно пост уже удален, попробуйте обновить посты")
            }
            setLoading(false)
        }).catch(e => {
            toast("Сервер не отвечает")
            console.log(e)
            setLoading(false)
        })
    }

    return (
        <Dialog>
            <DialogTrigger>
                <button className="rounded-lg bg-foreground w-6 h-6 flex items-center justify-center">
                    <Trash2 color="white" width={16} height={16} />
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>{post}</DialogTitle>
                <DialogDescription>
                    <p>Это дейсвтие невозможно отменить. Все данные с наших серверов будет удалено</p>
                </DialogDescription>
                <DialogFooter>
                    <Button disabled={isLoading} variant={"destructive"} onClick={handleSumbit}>
                        Удалить
                    </Button>
                </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}