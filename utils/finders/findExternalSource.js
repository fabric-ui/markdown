import React from 'react'

import {EXTERNAL_SOURCE_REGEX} from "../regex";
import styles from '../../styles/Markdown.module.css'


export function findImage(line) {
    let parsed = line
    const match = line.match(EXTERNAL_SOURCE_REGEX.image)
    if (match !== null) {
        const alt = match[1]
        const src = match[2]
        parsed = parsed.replace(`![${alt}](${src})`, `<img  src="${src}" alt="${alt}"/>`)

    }

    return parsed
}

export function findLink(line) {
    let parsed = line
    const match = line.match(EXTERNAL_SOURCE_REGEX.link)
    if (match !== null) {
        const alt = match[2]
        let href = match[3]
        const splitHref = href.split(' ')
        let title
        if (splitHref.length > 1)
            title = splitHref.splice(1, 2).join(' ')

        parsed = parsed.replace(`[${alt}](${href})`, `<a ${title !== undefined ? `title=${title}` : ''} class="${styles.link}"  href="${splitHref[0]}">${alt}</a>`)

        parsed = findLink(parsed)
    }


    return parsed
}

export function findLinkedImage(line) {
    let parsed = line
    const match = line.match(EXTERNAL_SOURCE_REGEX.linked_image)
    if (match !== null) {

        const alt = match[1]
        const href = match[3]
        const src = match[2]
        parsed = parsed.replace(EXTERNAL_SOURCE_REGEX.link, `<a class="${styles.link}" href="${href}"><img  src="${src}" alt="${alt}"/></a>`)
    }
    return parsed
}
