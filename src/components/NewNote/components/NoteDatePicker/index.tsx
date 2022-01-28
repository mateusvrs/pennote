import { useContext, useState } from "react"
import DatePicker from "react-datepicker";

import { NoteInfoContext } from "../.."

export function NoteDatePicker() {
    const [showDatePicker, setShowDatePicker] = useState(false)

    const { noteInfo, setNoteInfo } = useContext(NoteInfoContext)
    const { color, date } = noteInfo

    return (
        <section>
            <button className={`date-button datepicker-open-${showDatePicker}`} style={{ backgroundColor: color }} type='button' onClick={() => {
                setShowDatePicker(!showDatePicker)
            }}>
                <span className="material-icons-outlined">event</span>
            </button>
            <DatePicker
                onChange={date => {
                    setNoteInfo({
                        ...noteInfo,
                        date: date
                    })
                }}
                selected={date}
                inline
            />
        </section>
    )
}