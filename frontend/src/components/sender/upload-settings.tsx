import { ADD_COVERAGE_URL, CHECK_URL, UPLOAD_ORDER, UPLOAD_SETTINGS } from "@/lib/constants";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { DataProviderContext } from "@/components/data-provider";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useContext, useState } from "react";
import { Label } from "../ui/label";

export default function UplaodSettings() {
    const [request, setRequest] = useState<string>();
    const [phoneNumber, setPhoneNumber] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [timeout, setTimeout] = useState<string>();
    const [apiKey, setApiKey] = useState<string>();
    const [isHandled, setHandled] = useState<string>();
    const [proxy, setProxy] = useState<string>();

    const [isLoading, setLoading] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);

    const handleSumbit = () => {
        setLoading(true)
        setProgress(50)

        let body = {
            request,
            phone_number: phoneNumber,
            password,
            timeout,
            api_key: apiKey,
            is_handled: isHandled,
            proxy
        }

        fetch(UPLOAD_SETTINGS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
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

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"} className="w-full">Обновить настройки</Button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                <DialogTitle>Обновить настройки</DialogTitle>
                <DialogDescription>
                    Это действие невозможно отменить.
                </DialogDescription>
                <div className="space-y-4">
                    <div>
                        <Label>Поисковый запрос</Label>
                        <Input value={request}  onChange={(e) => setRequest(e.target.value)} id="file" name="Выбор файла" />
                    </div>
                    <div>
                        <Label>Телефон аккаунта</Label>
                        <Input value={phoneNumber}  onChange={(e) => setPhoneNumber(e.target.value)} id="file" name="Выбор файла" />
                    </div>
                    <div>
                        <Label>Пароль</Label>
                        <Input value={password}  onChange={(e) => setPassword(e.target.value)} id="file" name="Выбор файла" />
                    </div>
                    <div>
                        <Label>Время ожидание между постами</Label>
                        <Input value={timeout}  onChange={(e) => setTimeout(e.target.value)} id="file" name="Выбор файла" />
                    </div>
                    <div>
                        <Label>ChatGPT ApiKey</Label>
                        <Input value={apiKey}  onChange={(e) => setApiKey(e.target.value)} id="file" name="Выбор файла" />
                    </div>
                    <div>
                        <Label>Обработанный файл (1 или 2)</Label>
                        <Input value={isHandled}  onChange={(e) => setHandled(e.target.value)} id="file" name="Выбор файла" />
                    </div>
                    <div>
                        <Label>Proxy</Label>
                        <Input value={proxy} onChange={(e) => setProxy(e.target.value)} id="file" name="Выбор файла" />
                    </div>
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