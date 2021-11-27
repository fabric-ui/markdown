import React from 'react'

import styles from "../../styles/Markdown.module.css";
import {QUOTE_REGEX} from "../regex";

export default function findQuote  (line, callbackIndex) {
    const innerRegex = callbackIndex !== undefined && callbackIndex > 0 ? /\s&gt;\s(.+)/gi : /^&gt;\s/gi
    let parsed = line

    try {
        const split = parsed.split(innerRegex)
        if (split.length > 1)
            parsed = `<section data-layer="${callbackIndex !== undefined ? 'true' : 'false'}" class="${styles.quote}">${findQuote(findQuote(split[1], callbackIndex !== undefined ? callbackIndex + 1 : 1), 0)}</section>`
    } catch (e) {
        console.log(e, 'QUOTE ERROR')
    }

    return parsed
}

export function newFindQuotes(str){
    const split = str.split('\n')

    let quotes = []
    let lastWasQuote = false, blocks = [], startedOn

    split.forEach((s, i) => {
        if(s.match(QUOTE_REGEX.BASE)) {

            if(lastWasQuote){
                lastWasQuote = true
                blocks.push(s)
            }
            else {
                blocks = []
                lastWasQuote = true
                blocks.push(s)
                startedOn = i
            }
        }else {
            lastWasQuote = false
            if(blocks.length > 0)
                quotes.push({
                    starts: startedOn ,
                    ends: startedOn + blocks.length,
                    content: blocks.join('\n'),
                    length: blocks.length
                })
            blocks = []
        }
    })

    return quotes
}