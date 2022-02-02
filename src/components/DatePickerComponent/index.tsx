import DatePicker from "react-datepicker";

type DatePickerComponentProps = {
    handleDate: (value: Date | null) => void
}

export function DatePickerComponent({ handleDate }: DatePickerComponentProps) {
    return (
        <DatePicker
            onChange={(date) => handleDate(date)}
            inline
        />
    )
}