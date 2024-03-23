import { Button } from "@/components/ui/button";
import UploadComments from "./sender/upload-comments";
import UploadOrder from "./sender/upload-order";
import UploadInput from "./sender/upload-input";
import UplaodSettings from "./sender/upload-settings";

export default function Sender() {
    return (
        <div className="w-full max-h-[80vh] overflow-y-auto space-y-3">
            <UploadComments />
            <UploadOrder />
            <UploadInput />
            <UplaodSettings />
        </div>
    )
}