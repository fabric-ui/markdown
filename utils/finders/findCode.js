import React from 'react'
import {CODE_BLOCK} from "../regex";
import findIndex from "../findIndex";


export function newFindCode(str) {
    const match = str.match(CODE_BLOCK.BASIC)
    let matches = []
    if (match !== null)
        match.forEach(m => {

            const indexes = findIndex(str, m)
            // console.log(indexes, indexes.start + m.split('\n').length)
            matches.push({
                starts: indexes.start,
                ends: indexes.start + m.split('\n').length - 2,
                length: m.split('\n').length,
                content: m
            })
        })

    return matches
}