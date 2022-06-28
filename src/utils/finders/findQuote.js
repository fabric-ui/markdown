import React from "react"
import {QUOTE_REGEX} from "../regex"


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
                    content: blocks.map(b => b.replace(QUOTE_REGEX.BASE, '')).join('\n'),
                    length: blocks.length
                })
            console.log(blocks)
            blocks = []
        }
    })

    return quotes
}
