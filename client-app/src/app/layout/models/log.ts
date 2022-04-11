export interface Log {
    id : string
    date: string
    startTime: string
    endTime: string
    hourlyRate: number
    totalCharged? : number
    is_overtime?: boolean
    tagIds: string[]
}