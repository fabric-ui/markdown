export default function findIndex(string, toFind){
    // const split = string.split('\n')
    const splitFind = toFind.split('\n')
    let start
    // let currentIndex = 0

    // let continuesToBeEqual = false
    // const index = string.indexOf(toFind)
    // let characters = 0
    const d = string.split(toFind)

    if(d.length > 0)
        start = d[0].split('\n').length -1
    // split.forEach((s, i) => {
    //     characters += s.split('').length
    // })

    return {start}
}