import React from 'react'

import {TABLE_REGEX} from "../regex";
import styles from '../../styles/Markdown.module.css'
import findIndex from "../findIndex";


export function newFindTables(str) {
    let lastWasRow = false
    let tables = []
    const split = str.split('\n')
    let indexes = []
    let currentTable = []

    let dividerFound = false

    split.forEach(l => {
        if (l.match(TABLE_REGEX.CONTENT) !== null) {
            if(!dividerFound){
                dividerFound = l.match(TABLE_REGEX.DIVIDER) !== null
            }

            currentTable.push(l)
            lastWasRow = true
        } else if (currentTable.length > 0) {
            tables.push(currentTable.join('\n'))
            currentTable = []
            lastWasRow = false
        } else
            lastWasRow = false
    })

    tables.forEach(t => {
        const index = findIndex(str, t)
            console.log(index, t.split('\n').length)
        indexes.push({
            starts: index.start,
            ends: index.end,
            content: t,
            length:t.split('\n').length
        })
    })

    return indexes
}
