import { DOWNLAOD_COVERAGE_URL, DOWNLOAD_POST_URL } from "@/lib/constants"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Download } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { DialogHeader, DialogFooter } from "@/components/ui/dialog"

export default function DownloadCoverage({coverage}: {coverage: string}) {
    return (
        <Dialog>
            <DialogTrigger>
                <button className="rounded-lg bg-foreground w-6 h-6 flex items-center justify-center">
                    <Download color="white" width={16} height={16} />
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>{coverage}</DialogTitle>
                <DialogDescription>
                    <p>Это дейсвтие невозможно отменить.</p>
                </DialogDescription>
                <DialogFooter>
                    <Button variant={"outline"} onClick={() => {
                        toast("Начинаем скачку")
                    }} asChild>
                        <a href={DOWNLAOD_COVERAGE_URL(coverage)}>
                            Скачать
                        </a>
                    </Button>
                </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}