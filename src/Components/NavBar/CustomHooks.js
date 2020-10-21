import { useState } from 'react'

export function useSimpleState() {
    const [value, setValue] = useState(false)
    const handleTrue = () => {
        setValue(true)
    }

    const handleFalse = () => {
        setValue(false)
    }

    return (
        { value, handleTrue, handleFalse }
    )
}

