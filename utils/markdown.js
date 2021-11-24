import React from 'react'
import styles from '../styles/Markdown.module.css'
import {CODE_BLOCK, JSX_REGEX, RULE_REGEX, TABLE_REGEX} from "./regex";
import findList, {getType} from "./finders/findList";
import findQuote from "./finders/findQuote";
import {findBold, findItalic} from "./finders/findTypeface";
import {findInlineHeader} from "./finders/findHeader";
import {findRule} from "./finders/findRule";
import findTables from "./finders/findTable";
import {findImage, findLink} from "./finders/findExternalSource";
import findCode from "./finders/findCode";
import findTag from "./finders/findTag";



const startParagraph = (line) => {
    return `<p class="${styles.paragraph}">${line}</p>`
}

export default function markdownParser(data, id) {
    const original = data.split('\n')
    let parsedData = []
    let fixedData = []
    let [parsed, matches] = [undefined, undefined]
    try {
        [parsed, matches] = findCode(findTag(data),id)

        parsed.split('\n').forEach((line, index) => {
            let newLine = findBold(line)
            newLine = findItalic(newLine)

            newLine = findImage(newLine)
            newLine = findLink(newLine)

            const beforeHeader = newLine
            newLine = findInlineHeader(newLine)
            if (beforeHeader === newLine)
                newLine = findQuote(newLine)
            newLine = findRule(index > 0 ? parsed[index - 1] : null, newLine, index < parsed.length - 1 ? parsed[index + 1] : null)

            parsedData.push(newLine)
        })

        parsedData = findList(parsedData, data.split('\n'))
        parsedData = findTables(parsedData, data.split('\n'))

        parsedData.forEach(e => {
            if (original.indexOf(e) > -1 && e.match(/(\S+)/g))
                fixedData.push(startParagraph(e))
            else
                fixedData.push(e)
        })

        parsedData =fixedData.join('\n')


    } catch (e) {
        console.log(e)
    }

    return [parsedData, matches]
}
