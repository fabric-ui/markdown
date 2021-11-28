import styles from "../../styles/Markdown.module.css";
import {HTML_REGEX, RULE_REGEX} from "../regex";

const startParagraph = (line) => {
    return `<p class="${styles.paragraph}">${line}</p>`
}

export default function findParagraph(parsedData) {
    let parsed = []
    let lastWasP = false, currentP = [], startedOn

    parsedData.forEach((s, i) => {

        if (s.type === 'line' || s.type === 'empty') {
            if (startedOn === undefined) {
                startedOn = s.starts
            }
            if (!s.content.includes('&custom-empty;') && s.content.trim().length > 0) {
                const content = s.content.match(HTML_REGEX.TAG) === null ? startParagraph(s.content) : s.content
                if (lastWasP)
                    currentP.push(content)
                else {
                    currentP.push(content)
                    lastWasP = true
                }
            }
        } else if (s.content.trim().length > 0) {
            lastWasP = false
            if (currentP.length > 0) {
                parsed.push({
                    starts: startedOn,
                    content: startParagraph(currentP.join('\n')),
                    length: 0,
                    type: 'line'
                })
            }

            parsed.push(s)
            currentP = []

            startedOn = undefined
        }

    })

    if (currentP.length > 0) {
        parsed.push({
            starts: startedOn,
            content: startParagraph(currentP.join('\n')),
            length: 0,
            type: 'line'
        })
    }

    return parsed
}