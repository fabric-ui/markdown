import React from 'react'

import {INLINE_HEADER} from "../regex";
import styles from '../../styles/Markdown.module.css'

export function findInlineHeader (line) {
    let found = false
    let parsed = line
    try {
        Object.keys(INLINE_HEADER).forEach(k => {
            if (parsed.match(INLINE_HEADER[k]) !== null && found === false) {
                const split = parsed.split(INLINE_HEADER[k])

                if (split.length > 1)
                    parsed = `<h${k} class="${styles.header}">${split[1]}</h${k}>`

                found = true
            }
        })
    } catch (e) {
        console.log(e)
    }
    return parsed
}
