import { useEffect } from "react"

type useHideElementsProps = {
    elementId: string
    setShowElement: (value: boolean) => void
}

export function useHideElements({ elementId, setShowElement }: useHideElementsProps) {

    useEffect(() => {
        function handleClicks(event: MouseEvent) {
            const element = document.getElementById(elementId)
            if (!element?.contains(event.target as Node)) {
                setShowElement(false)
            }
        }

        document.addEventListener('click', handleClicks)

        return () => {
            document.removeEventListener('click', handleClicks)
        }
    }, [setShowElement, elementId])

}