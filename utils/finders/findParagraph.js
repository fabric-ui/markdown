export default function findParagraph(parsedData) {
    let parsed = []
    let lastWasP = false, currentP = [], startedOn
    console.log(parsedData.length)
    parsedData.forEach((s, i) => {
        console.log(s.type)
        if (s.type === 'line') {

            if (startedOn === undefined) {
                startedOn = i
            }
            if (lastWasP)
                currentP.push(s.content)
            else {
                currentP.push(s.content)
                lastWasP = true
            }
        } else {
            console.log(currentP)
            lastWasP = false
            if (currentP.length > 0)
                parsed.push({
                    starts: startedOn,
                    content: currentP.join('\n'),
                    length: 0,
                    ends: startedOn + currentP.length - 1,
                    type: 'line'
                })
            currentP = []
            parsed.push(s)
            startedOn = undefined
        }
    })
    console.log(parsed)
    // parsed = parsed.filter(p => p.starts)

    return parsed
}