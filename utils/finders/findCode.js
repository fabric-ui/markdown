import React from 'react'

import {CODE_BLOCK} from "../regex";
import styles from '../../styles/Markdown.module.css'
import javascriptParser from "../parsers/javascript";
import jsonParser from "../parsers/json";
import consoleParser from "../parsers/console";
import htmlParser from "../parsers/html";
import findTag from "./findTag";

function identifyType(str, clean) {
    let parsedClean = findTag(clean)
    parsedClean = parsedClean.split('\n')
    parsedClean = parsedClean.map(p => {
        return `&nbsp;${p}`
    })

    parsedClean = parsedClean.join('\n')

    parsedClean = parsedClean.replaceAll(/'/g, '&quot;')
    parsedClean = parsedClean.replaceAll(/"/g, '&quot;')
    parsedClean = parsedClean.replaceAll(/´/g, '&quot;')

    switch (true) {
        case str.match(CODE_BLOCK.TYPES.jsx) !== null:
            return javascriptParser(parsedClean)
        case str.match(CODE_BLOCK.TYPES.javascript) !== null:
            return javascriptParser(parsedClean)
        case str.match(CODE_BLOCK.TYPES.json) !== null:
            return jsonParser(parsedClean)
        case str.match(CODE_BLOCK.TYPES.console) !== null:
            return consoleParser(parsedClean)
        case str.match(CODE_BLOCK.TYPES.html) !== null:
            return htmlParser(parsedClean)

        default:
            return parsedClean
    }
}

export default function findCode(str, id) {
    const match = str.match(CODE_BLOCK.BASIC)
    let parsed = str
    let matches = []

    if (match !== null)
        match.forEach((e, i) => {

            const m = e.match(CODE_BLOCK.NOT_GLOBAL)
            console.log(e, m)
            if (m !== null) {
                let parsedBlock = identifyType(e, m[2])
                parsedBlock = parsedBlock.split('\n')

                parsedBlock = parsedBlock.map((p, i) => {
                    return `<button data-index="${i}" data-variant="code" class="${styles.lineEnumeration}">${'&nbsp'.repeat(Math.ceil(parsedBlock.length * .1))}<span style="user-select: text">${p}</span></button>`
                })
                matches.push(id + '-button-' + i)
                parsed = parsed.replace(
                    CODE_BLOCK.NOT_GLOBAL,
                    `<section style="position: relative"><link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"/><button id="${id + '-button-' + i}" class="${styles.copyButton}"><span class="material-icons-round">copy</span></button><pre class="${styles.code}">${parsedBlock.join('\n')}</pre></section>`
                )
            }
        })
    return [parsed, matches]
}
