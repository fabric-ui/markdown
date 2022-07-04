import React from "react"
import {CODE_BLOCK} from "../regex"
import styles from "../../styles/Markdown.module.css"

function findTag(data) {
   return data
}


function identifyType(str, clean) {
   const parsedClean = clean
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .split("\n")
      .map(p => `&nbsp;${p}`)
      .join("\n")
      .replaceAll(/'/g, "&quot;")
      .replaceAll(/"/g, "&quot;")
      .replaceAll(/´/g, "&quot;")

   return parsedClean.split("\n")
      .map(s => {
         const keywords = /(\s*)(console\.log|console\.error|return|function|import|var|const)(\s+)/g
         const match = s.match(keywords)
         let final = s
         if (match)
            match.forEach(m => {
               final = final.replace(m, `<span class="${styles.keyword}">${m}</span>`)
            })
         return final
      })
}

export default function parseCode(block) {

   let parsed = block.content
   const m = block.content.match(CODE_BLOCK.NOT_GLOBAL)

   if (m !== null) {
      const parsedBlock = identifyType(block.content, m[4].replace(/(\n|\r\n)/, "\n"))
         .map((p, i, self) => {
            return `<button data-index="${i}" data-variant="code" class="${styles.lineEnumeration}">${"&nbsp".repeat(Math.ceil(self.length * .1) + 2)}<span style="user-select: text">${p}</span></button>`
         }).join("\n")
      parsed = `<section style="position: relative; width: 100%"><pre class="${styles.code}">${parsedBlock}</pre></section>`
   }

   return parsed
}
