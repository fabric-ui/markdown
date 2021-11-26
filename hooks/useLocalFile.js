import React, {useEffect, useState} from 'react'

export default function useLocalFile(pathname) {
    const [data, setData] = useState()
    useEffect(() => {
        fetch(pathname).then(res => res.text().then(text => setData(text))).catch(error => {})
    }, [pathname])

    return data
}