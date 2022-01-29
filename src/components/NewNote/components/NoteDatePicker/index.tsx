import { useState } from "react"
import DatePicker from "react-datepicker";

import { useNoteInfo } from "../../../../hooks/useNoteInfo";

export function NoteDatePicker() {
    const [showDatePicker, setShowDatePicker] = useState(false)

    const { noteInfo, setNoteInfo } = useNoteInfo()
    const { color } = noteInfo

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
                        date: date?.toLocaleDateString() === undefined ? null : date?.toLocaleDateString()
                    })
                }}
                selected={new Date()}
                inline
            />
        </section>
    )
}