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
            if (!s.content.includes('&custom-empty;') && s.content.match(/(\S+)/g) !== null) {

                let open = s.content.match(HTML_REGEX.TAG)
                let closed = s.content.match(HTML_REGEX.CLOSING_TAG)
                const hasImage = s.content.match(HTML_REGEX.IMAGE_TAG)

                let content = hasImage === null && ((open === null && closed === null) || (open !== null && closed !== null && open.length === closed.length)) ? startParagraph(s.content) : s.content
                // open = content.match(HTML_REGEX.TAG)
                // closed = content.match(HTML_REGEX.CLOSING_TAG)

                // content = (open === null && closed === null || (closed !== null && open.length === closed.length)) ? content : s.content

                // if(s.content.trim().length > 0 && !s.content.includes('<img ') && (open === null || (closed !== null && open.length === closed.length)))
                // if(((open === null && closed === null) || (open !== null && closed !== null && open.length === closed.length)))
                //     console.log(content, open, closed)
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
                    content: currentP.length > 1 ? startParagraph(currentP.join('\n')) : currentP.join('\n'),
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
            content: currentP.length > 1 ?  startParagraph(currentP.join('\n')) : currentP.join('\n'),
            length: 0,
            type: 'line'
        })
    }


    return parsed
}