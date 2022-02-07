import { useState } from "react"
import { useHideElements } from "../../../../hooks/useHideElements";
import { useNoteInfo } from "../../../../hooks/useNoteInfo";

import { DatePickerComponent } from "../../../DatePickerComponent";

export function NoteDatePicker() {
    const [showDatePicker, setShowDatePicker] = useState(false)

    const { noteInfo, setNoteInfo } = useNoteInfo()
    const { color } = noteInfo

    useHideElements({ elementId: 'date-picker-section', setShowElement: setShowDatePicker })

    function handleNewDate(date: Date | null) {
        setNoteInfo({
            ...noteInfo,
            date: date?.toDateString() ? date.toDateString() : null})
    }

    return (
        <section id='date-picker-section'>
            <button className={`date-button datepicker-open-${showDatePicker}`} style={{ backgroundColor: color }} type='button' onClick={() => {
                setShowDatePicker(!showDatePicker)
            }}>
                <span className="material-icons-outlined">event</span>
            </button>
            <DatePickerComponent handleDate={handleNewDate} />
        </section>
    )
}
