import React from 'react'
import styles from '../styles/Markdown.module.css'
import findList from "./finders/findList";
import findQuote from "./finders/findQuote";
import {findBold, findItalic} from "./finders/findTypeface";
import {findInlineHeader} from "./finders/findHeader";
import {findRule} from "./finders/findRule";
import findTables from "./finders/findTable";
import {findImage, findLink, findLinkedImage} from "./finders/findExternalSource";
import findCode from "./finders/findCode";
import findTag from "./finders/findTag";
import {CODE_BLOCK, HTML_REGEX, JSX_REGEX, RULE_REGEX} from "./regex";


const startParagraph = (line) => {
    return `<p class="${styles.paragraph}">${line}</p>`
}

export default function markdownParser(data, id) {
    const original = data.split('\n')

    let parsedData = []
    let fixedData = []
    let [parsed, matches] = [undefined, undefined]
    try {
        [parsed, matches] = findCode(data,id)

        parsed.split('\n').forEach((line, index) => {
            let newLine = findBold(line)
            newLine = findItalic(newLine)

            newLine = findLinkedImage(newLine)
            newLine = findImage(newLine)
            const b = newLine
            newLine = findLink(newLine)

            const beforeHeader = newLine
            newLine = findInlineHeader(newLine)
            if (beforeHeader === newLine)
                newLine = findQuote(newLine)
            newLine = findRule(index > 0 ? parsed[index - 1] : null, newLine, index < parsed.length - 1 ? parsed[index + 1] : null)


            if(newLine.match(RULE_REGEX.emptyLine) !== null && newLine.indexOf('data-variant="code"') === -1)
                newLine = startParagraph(newLine)
            // newLine.match(HTML_REGEX.TAG) === null
            parsedData.push(newLine)

        })

        parsedData = findList(parsedData, data.split('\n'))
        parsedData = findTables(parsedData, data.split('\n'))

        parsedData.forEach(e => {
            // if (original.indexOf(e) > -1 && e.match(/(\S+)/g))
            //     fixedData.push(startParagraph(e))
            // else
                fixedData.push(e)
        })

        parsedData =fixedData.join('\n')


    } catch (e) {
        console.log(e)
    }
    // console.log(data)
    return [parsedData, matches]
}
