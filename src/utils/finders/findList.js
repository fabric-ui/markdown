import React from "react"

import {LIST_REGEX} from "../regex"

export function getType(e) {
    switch (true) {
        case e.match(LIST_REGEX.number) !== null:
            return 'number'
        case e.match(LIST_REGEX.plus) !== null:
            return 'plus'
        case e.match(LIST_REGEX.minus) !== null:
            return 'minus'
        case e.match(LIST_REGEX.asterisk) !== null:
            return 'asterisk'
        default:
            return null
    }
}

export function newFindLists(str) {
    const split = str.split('\n')

    let lists = []

    split.forEach((s, i) => {
        const type = getType(s)

        if (type) {
           lists.push({
              starts: i,
              content: s,
              length: 1,
              ends: i + 1
           })
        }
    })
    return lists
}
