import DatePicker from "react-datepicker";

import { DatePickerComponentProps } from "../../types/components/DatePickerComponent";

import './styles.scss'

export function DatePickerComponent({ handleDate }: DatePickerComponentProps) {
    return (
        <DatePicker
            onChange={(date) => handleDate(date)}
            inline
        />
    )
}