export interface PlaceOrder {
    id?: number,
    userId: number,
    cardId: number,
    model?: string,
    startTime: Date,
    endTime: Date,
    email?: string
}