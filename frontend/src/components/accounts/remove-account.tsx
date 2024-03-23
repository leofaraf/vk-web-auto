import {
    Dialog,
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
import { Label } from "@/components/ui/label"

export default function RemoveAccountDialog({account}: any) {
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
