import { useContext } from "react";
import { NoteInfoContext } from "../contexts/NoteInfoContext";

export function useNoteInfo() {
    const context = useContext(NoteInfoContext)

    return context
}