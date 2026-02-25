import type { Id } from "./Id";



export interface AttachmentResponse extends Id {
    fileName: string
    contentType: string
    size: string
    url: string
    mediaType: string
}