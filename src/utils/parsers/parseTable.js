import React from "react"

const removeLimiters = (str) => {
    return str.split('| ').filter(s => s !== '| ').join('').split(' |').filter(s => s !== ' |').join('')
}
export default function parseTable(block) {
    const split = block.content.split('\n')
    const header = [split[0]]
    split.splice(0, 2)

    let splitColumns = split.map(c => c.split(' | '))
    splitColumns = splitColumns.map(c => `<tr>${c.map(cc => `<td>${removeLimiters(cc)}</td>`).join('')}</tr>`).join('')

    let splitHeaders = header.map(c => c.split(' | '))
    splitHeaders = splitHeaders.map(c => `<tr>${c.map(cc => `<th>${removeLimiters(cc)}</th>`).join('')}</tr>`).join('')

    return `<table>${splitHeaders}\n${splitColumns}</table>`

}
