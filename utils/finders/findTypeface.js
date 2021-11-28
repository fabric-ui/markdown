import React from 'react'

import {BOLD_REGEX, INLINE_CODE_REGEX, ITALIC_REGEX, STRIKETHROUGH} from "../regex";
import styles from '../../styles/Markdown.module.css'


export function findTypeface(line) {
    let parsed = line
    try {
        // const asterisk = parsed.match(BOLD_REGEX.BASE_ASTERISK)
        // const underline = parsed.match(BOLD_REGEX.BASE_UNDERLINE)
        // // console.log(line)
        // if (asterisk !== null) {
        //     asterisk.forEach(i => {
        //         const matched = i.match(BOLD_REGEX.ASTERISK)
        //         parsed = line.replace(matched[0], `<b>${matched[1]}</b>`)
        //
        //     })
        // }
        // if (underline !== null) {
        //     console.log(underline)
        //     underline.forEach(i => {
        //         const matched = i.match(BOLD_REGEX.UNDERLINE)
        //         parsed = line.replace(matched[0], `<b>${matched[1]}</b>`)
        //
        //     })
        // }
        //
        // const asteriskItalic = parsed.match(ITALIC_REGEX.BASE_ASTERISK)
        // const underlineItalic = parsed.match(ITALIC_REGEX.BASE_UNDERLINE)
        //
        // if (asteriskItalic !== null) {
        //
        //     asteriskItalic.forEach(i => {
        //         const matched = i.match(ITALIC_REGEX.ASTERISK)
        //         parsed = parsed.replace(matched[0], `<i>${matched[1]}</i>`)
        //     })
        // }
        // if (underlineItalic !== null) {
        //
        //     underlineItalic.forEach(i => {
        //         const matched = i.match(ITALIC_REGEX.UNDERLINE)
        //         parsed = parsed.replace(matched[0], `<i>${matched[1]}</i>`)
        //     })
        //
        // }

        const strikethrough = parsed.match(STRIKETHROUGH.BASE)

        if (strikethrough !== null) {
            strikethrough.forEach(i => {

                const matched = i.match(STRIKETHROUGH.NOT_GLOBAL)
                parsed = parsed.replace(matched[0], `<span style="text-decoration: line-through">${matched[1]}</span>`)

            })
        }

        const inlineCode = parsed.match(INLINE_CODE_REGEX.BASE)

        if (inlineCode !== null) {
            inlineCode.forEach(i => {
                const matched = i.match(INLINE_CODE_REGEX.NOT_GLOBAL)

                parsed = parsed.replace(matched[0], `<span class="${styles.inlineCode}">${matched[1]}</span>`)
            })
        }

        // const commentedHtml = parsed.match(HTMLRE.BASE)
        //
        // if (inlineCode !== null) {
        //     inlineCode.forEach(i => {
        //         const matched = i.match(INLINE_CODE_REGEX.NOT_GLOBAL)
        //
        //         parsed = parsed.replace(matched[0], `<span class="${styles.inlineCode}">${matched[1]}</span>`)
        //     })
        // }
    } catch (e) {
        console.log(e)
    }
    return parsed
}
