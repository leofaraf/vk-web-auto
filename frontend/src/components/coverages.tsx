import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { DataProviderContext } from "@/components/data-provider"
import { useContext } from "react"
import UpdateCoverage from "./coverages/update-coverages";
import DownloadCoverage from "./coverages/download-coverages";
import DeleteCoverage from "./coverages/delete-coverages";
import UploadPost from "./coverages/upload-post";
import { Button } from "@/components/ui/button";
import { OUTPUT_DOWNLOAD } from "@/lib/constants";
import CreateCoverages from "./coverages/create-coverages";

export default function Coverages() {
    const dataContext = useContext(DataProviderContext);

    return (
        <div className="w-full max-h-[80vh] overflow-y-auto space-y-3">
            <UpdateCoverage />
            <UploadPost />
            <Button variant={"outline"} className="w-full" asChild>
                <a download href={OUTPUT_DOWNLOAD}>Скачать последний результат</a>
            </Button>
            <CreateCoverages />
            <Table>
                <TableCaption>Список постов.</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">Название</TableHead>
                        <TableHead className="text-right">Перейти</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {dataContext?.coverages.map((coverage) => (
                    <TableRow key={coverage}>
                        <TableCell className="font-medium">{coverage}</TableCell>
                        <TableCell className="text-right space-x-1">
                            <DownloadCoverage coverage={coverage} />
                            <DeleteCoverage coverage={coverage} />
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Всего</TableCell>
                        <TableCell className="text-right">{dataContext?.coverages.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}