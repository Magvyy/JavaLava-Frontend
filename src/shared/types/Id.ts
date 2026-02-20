export interface Id {
    id: Number
}

export interface Perms extends Id {
    read: boolean
    write: boolean
    delete: boolean
}