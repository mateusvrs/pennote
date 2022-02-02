import { useState } from 'react'
import { BlockPicker } from 'react-color'
import { useNoteInfo } from '../../../../hooks/useNoteInfo'

export function NoteColorPicker() {
    const defaultColors = ['#E5E5E5', '#92A9BD', '#9AB3F5', '#D5BFBF', '#F1AE89', '#DED7B1', '#87AAAA', '#FD9191', '#FDE49C', '#DA9FF9']
    const [showColorPicker, setShowColorPicker] = useState(false)

    const { noteInfo, setNoteInfo } = useNoteInfo()
    const { color } = noteInfo

    
    return (
        <section>
            <button className='color-button' style={{ backgroundColor: color }} type='button' onClick={() => {
                setShowColorPicker(!showColorPicker)

            }}>
                <span className="material-icons-outlined">palette</span>
            </button>
            <BlockPicker
                className={`colorpicker-open-${showColorPicker}`}
                color={color}
                onChangeComplete={color => {
                    setNoteInfo({
                        ...noteInfo,
                        color: color.hex
                    })
                }}
                colors={defaultColors}
            />
        </section>
    )
}