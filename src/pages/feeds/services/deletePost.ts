import { deletePostAPI } from "@/features/posts/services/deletePostAPI";

export async function deletePost(id: number, onDelete: (id: number) => void) {
    let identification = await deletePostAPI(id);
    if (identification) onDelete(identification);
}