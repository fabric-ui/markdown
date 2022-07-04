import React from "react"
import {QUOTE_REGEX} from "../regex"


export function newFindQuotes(str){
    const split = str.split('\n')

    let quotes = []
    let lastWasQuote = false, blocks = [], startedOn

    split.forEach((s, i) => {
       const match = s.match(QUOTE_REGEX.BASE)

        if(match) {

            if(lastWasQuote){
                lastWasQuote = true
                blocks.push(s)
            }
            else {

                blocks.push(s)
               lastWasQuote = true
                startedOn = i
            }
        }else {
            lastWasQuote = false
            if(blocks.length > 0)
                quotes.push({
                    starts: startedOn,
                    ends: startedOn + blocks.length ,
                    content: blocks.map(b => b.replace(QUOTE_REGEX.BASE, '')).join('\n'),
                    length: blocks.length
                })
            blocks = []
        }
    })


    return quotes
}
