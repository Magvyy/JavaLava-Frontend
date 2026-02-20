
export function createPostRequest(id: number | null, content: string, visible: boolean) {
    return {
        id: id,
        content: content,
        visible: visible
    };
}