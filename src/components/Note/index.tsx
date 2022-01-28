import './styles.scss'

type NoteProps = {
    color: string
    date: string
    text: string
}

export function Note(props: NoteProps) {
    return (
        <section className="note-container">
            <span className="material-icons-outlined">check_circle</span>
            <p>{props.text}</p>
            <footer>
                <span className="date-text">{props.date}</span>
                <div>
                    <button><span className="material-icons-outlined edit">edit</span></button>
                    <button><span className="material-icons delete">delete</span></button>
                </div>
            </footer>
        </section>
    )
}