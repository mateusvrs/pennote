import DatePicker from "react-datepicker";

import { DatePickerComponentProps } from "../../types/components/DatePickerComponent";

export function DatePickerComponent({ handleDate }: DatePickerComponentProps) {
    return (
        <DatePicker
            onChange={(date) => handleDate(date)}
            inline
        />
    )
}