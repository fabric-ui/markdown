import React from 'react'
import styles from '../styles/Markdown.module.css'
import {newFindLists} from "./finders/findList";
import {newFindQuotes} from "./finders/findQuote";
import {findBold, findItalic} from "./finders/findTypeface";
import {findInlineHeader} from "./finders/findHeader";
import {newFindRules} from "./finders/findRule";
import {newFindTables} from "./finders/findTable";
import {findImage, findLink, findLinkedImage} from "./finders/findExternalSource";
import {newFindCode} from "./finders/findCode";
import removeParts from "./removeParts";
import parseCode from "./parsers/parseCode";
import parseHeader from "./parsers/parseHeader";
import {CODE_BLOCK} from "./regex";
import parseTable from "./parsers/parseTable";
import parseList from "./parsers/parseList";


const startParagraph = (line) => {
    return `<p class="${styles.paragraph}">${line}</p>`
}

export default function markdownParser(data, id) {
    let matches = []
    let string = data, linesRemoved = 0
    try {
        const codes = newFindCode(string)

        const removedCode = removeParts(codes, string, linesRemoved, id, 'code')
        string = removedCode[0]
        linesRemoved = removedCode[1]


        const rules = newFindRules(string)
        const removedRule = removeParts(rules, string, linesRemoved, id, 'rule')
        string = removedRule[0]
        linesRemoved = removedRule[1]

        console.log(string)
        const tables = newFindTables(string)
        const removedTable = removeParts(tables, string, linesRemoved, id, 'table')
        string = removedTable[0]
        linesRemoved = removedTable[1]

        const lists = newFindLists(string)
        const removedList = removeParts(lists, string, linesRemoved, id, 'list')
        string = removedList[0]
        linesRemoved = removedList[1]

        // const quotes = newFindQuotes(string)
        // const removedQuote = removeParts(quotes, string, linesRemoved, id, 'quote')
        // string = removedQuote[0]
        // linesRemoved = removedQuote[1]

        const headers = findInlineHeader(string)
        const removedHeader = removeParts(headers, string, linesRemoved, id, 'header')
        string = removedHeader[0]


        string = string.split('\n').map(line => {
            let parsed = line
            if(!line.includes(id)){
                parsed = findLinkedImage(parsed)
                parsed = findImage(parsed)
                parsed = findLink(parsed)
                parsed = findBold(parsed)
                parsed = findItalic(parsed)


                parsed = startParagraph(parsed)
            }
            else{
                const type = line.split('-')[1]
                const index = parseInt(line.split('-')[2].replace('}', ''))
                if(!isNaN(index))
                    switch (type){
                        case 'code':{
                            const [p, bID] = parseCode(codes[index], index, id)
                            parsed = p
                            matches.push(bID)
                            break
                        }
                        case 'list':{
                            // parsed = parseList(lists[index])
                            break
                        }
                        case 'table':{
                            // parsed = parseTable(tables[index])
                            break
                        }
                        case 'header':{
                            // parsed = parseHeader(headers[index])
                            break
                        }
                        default:
                            break
                    }
            }
            return parsed
        }).join('\n')

    } catch (e) {
        console.log(e)
    }
    // console.log(data)
    return [string, matches]
}
