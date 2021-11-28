import React from 'react'
import {CODE_BLOCK} from "../regex";
import findIndex from "../findIndex";


export function newFindCode(str) {
    const match = str.match(CODE_BLOCK.BASIC)
    let matches = []
    if (match !== null)
        match.forEach(m => {

            const indexes = findIndex(str, m)

            matches.push({
                starts: indexes.start,
                ends: indexes.start + m.split('\n').length,
                length: m.split('\n').length -1,
                content: m
            })
        })

    return matches
}