import React from "react"
import styles from "../../styles/Markdown.module.css"


const REGEX = {
    BASE: /\[(\s*)\]/gm,
    W_BASE: /\[(x)\]/gm,
}

export function findCheckboxes(lines) {
    return lines.map(p => {
        const withCheck =  p.replaceAll(REGEX.W_BASE, `<div data-icon="true" class"${styles.checkbox}" style="font-size: 12px;">check</div>`)
        return withCheck.replaceAll(REGEX.BASE, `<div data-icon="true" class="${styles.checkbox}"></div>`)
    })
}
