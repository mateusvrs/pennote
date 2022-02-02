import { useState } from "react"

import { useNoteInfo } from "../../../../hooks/useNoteInfo";
import { DatePickerComponent } from "../../../DatePickerComponent";

export function NoteDatePicker() {
    const [showDatePicker, setShowDatePicker] = useState(false)

    const { noteInfo, setNoteInfo } = useNoteInfo()
    if(noteInfo) {
        var { color } = noteInfo
    }

    function handleNewDate(date: Date | null) {
        setNoteInfo({
            ...noteInfo,
            date: date?.toDateString() ? date.toDateString() : null})
    }

    return (
        <section>
            <button className={`date-button datepicker-open-${showDatePicker}`} style={{ backgroundColor: color }} type='button' onClick={() => {
                setShowDatePicker(!showDatePicker)
            }}>
                <span className="material-icons-outlined">event</span>
            </button>
            <DatePickerComponent handleDate={handleNewDate} />
        </section>
    )
}
