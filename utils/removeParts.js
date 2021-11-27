export default function removeParts(toRemove, str, removed = 0, id, type) {
    const split = str.split('\n')

    let linesRemoved = 0
    // console.log(split.length)
    toRemove.forEach((t, i) => {

        split.splice(t.starts - linesRemoved, t.length)
        split[t.starts] = `{${id}-${type}-${i}}`

        linesRemoved += t.length
    })


    return [split.join('\n'), linesRemoved]
}