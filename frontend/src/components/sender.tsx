import { Button } from "@/components/ui/button";
import UploadComments from "@/components/sender/upload-comments";
import UploadOrder from "@/components/sender/upload-order";
import UploadInput from "@/components/sender/upload-input";
import UplaodSettings from "@/components/sender/upload-settings";
import SenderRunner from "@/components/sender/sender-runner";
import { SENDER_LOGS_URL } from "@/lib/constants";

export default function Sender() {
    return (
        <div className="w-full max-h-[80vh] overflow-y-auto space-y-3">
            <UploadComments />
            <UploadOrder />
            <UploadInput />
            <UplaodSettings />
            <Button asChild variant={"outline"} className="w-full">
                <a target="_blank" href={SENDER_LOGS_URL}>
                    Логи скрипта
                </a>
            </Button>
            <SenderRunner />
        </div>
    )
}