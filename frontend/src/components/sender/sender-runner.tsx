import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { SENDER_WS_URL } from "@/lib/constants";
import { toast } from "sonner";

export default function SenderRunner() {
    const [connection, setConnection] = useState<WebSocket | null>(null)
    const [isActive, setActive] = useState<boolean>(false)

    useEffect(() => {
        // Use setTimeout to update the message after 2000 milliseconds (2 seconds)
        const intervalId = setInterval(() => {
            if (connection !== null) {
                console.log('status!');

                connection.send("status")
            } else {
                console.log('cant get status!');
            }
        }, 3000);
    
        return () => clearInterval(intervalId); //This is important
        // Cleanup function to clear the timeout if the component unmounts
    }, [connection]);

    useEffect(() => {
        toast(isActive ? "Скрипт теперь активен" : "Скрипт теперь не активен")
    }, [isActive])

    const handleConnectionButton = () => {
        if (connection != null) {
            let ws: WebSocket = connection
            ws.send("close")
        } else {
            const ws = new WebSocket(SENDER_WS_URL)
            ws.onclose = (e) => {
                toast("Сервер не отвечает!")
                setConnection(null)
            }
            ws.onmessage = (message) => {
                if (message.data === "inactive") {
                    setActive(false)
                } else if (message.data === "active") {
                    setActive(true)
                } else if (message.data === "cant_stop") {
                    toast("Не получается остоновить, возможно скрипт уже остановлен")
                    setActive(false)
                } else if (message.data === "cant_start") {
                    toast("Не получается запустить, возможно скрипт уже запущен")
                    setActive(true)
                } else if (message.data === "started") {
                    toast("Скрипт запущен")
                } else if (message.data === "stopped") {
                    toast("Скрипт остановлен")
                }
            }
            ws.onopen = (e) => {
                console.log("connected")
                ws.send("status")
                setConnection(ws)
                toast("Подключенно.")
            }
        }
    }

    const handleTogglerButton = () => {
        if (connection) {
            connection.send(isActive ? "stop" : "start")
        }
    }

    return (
        <div className="space-y-2">
            <Button variant={"outline"} className="w-full" onClick={handleConnectionButton}>
                {connection ? "Отключиться" : "Подключиться"}
            </Button>
            {connection && (
                <Card>
                    <CardHeader>
                    <CardTitle>Коментатор</CardTitle>
                        <CardDescription>Меню для работы со скриптом</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button className="w-full" onClick={handleTogglerButton}>
                            {isActive ? "Остановить" : "Запустить"}
                        </Button>
                    </CardContent>
                    <CardFooter>
                        <div>
                            <p className="text-sm">Статус (недавно): {isActive ? "активен" : "не активен"}</p>
                        </div>
                    </CardFooter>
              </Card>
            )}
        </div>
    )
}