export interface Log {
    id? : string
    date: string
    startTime: string
    finishTime: string
    hourlyRate: number
    totalCharged? : number
    is_overtime?: boolean
}