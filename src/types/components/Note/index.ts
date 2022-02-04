export type NoteProps = {
    color: string
    date: string | null
    text: string
    id: string
    isComplete: boolean
    category: {
        value: string | null
        label: string | null
    }
}
