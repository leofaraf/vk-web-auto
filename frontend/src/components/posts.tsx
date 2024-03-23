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
import CreatePost from "@/components/posts/create-post"
import UpdatePosts from "@/components/posts/update-posts"
import DeletePost from "@/components/posts/delete-post"
import DownloadPost from "@/components/posts/download-post"
import { Button } from "./ui/button"

export default function Posts() {
    const dataContext = useContext(DataProviderContext);

    return (
        <div className="w-full max-h-[80vh] overflow-y-auto space-y-3">
            <UpdatePosts />
            <CreatePost />

            <Table>
                <TableCaption>Список постов.</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">Название</TableHead>
                        <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {dataContext?.posts.map((post) => (
                    <TableRow key={post}>
                        <TableCell className="font-medium">{post}</TableCell>
                        <TableCell className="text-right space-x-1">
                            <DeletePost post={post} />
                            <DownloadPost post={post} />
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Всего</TableCell>
                        <TableCell className="text-right">{dataContext?.posts.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}