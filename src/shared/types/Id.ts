export interface Id {
    id: number
}

export interface Perms extends Id {
    read: boolean
    write: boolean
    delete: boolean
}