import React, {useEffect, useMemo, useRef} from "react"

import markdownParser from "../utils/markdown"
import styles from "../styles/Markdown.module.css"

export default function useMarkdown(markdownData) {
   const id = useMemo(() => {
      let result = '';
      let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let charactersLength = characters.length;
      for (let i = 0; i < 16; i++) {
         result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
      }
      return result;
   }, [])

   const data = useMemo(() => {
      if (markdownData !== undefined && markdownData !== null) {
         const [htmlData, metadata] = new markdownParser(markdownData, id)
         return {htmlData, metadata}
      } else
         return {htmlData: null, metadata: []}
   }, [markdownData, id])

   const ref = useRef()
   const removeEmpty = (el) => {
      Array.from(el.children).forEach(e => {
         if (Array.from(e.children).length === 0 && (!e.innerText || e.innerText.trim().length === 0) && e.nodeName !== '#text' && e.nodeName !== 'IMG' && !e.classList.contains(styles.divider))
            el.removeChild(e)
         else {
            if (e.getAttribute('dir'))
               e.style.diplay = e.getAttribute('dir') === 'auto' ? 'flex' : undefined
            if (e.getAttribute('width'))
               e.style.width = e.getAttribute('width')
            if (e.getAttribute('height'))
               e.style.height = e.getAttribute('height')
            removeEmpty(e)
         }
      })
   }
   useEffect(() => {
      removeEmpty(ref.current)
      const tables = ref.current.getElementsByTagName("table")
      const tableRows = ref.current.getElementsByTagName("tr")
      const tableContent = [...Array.from(ref.current.getElementsByTagName("td")), ...Array.from(ref.current.getElementsByTagName("th"))]
      for(let i =0; i < tables.length; i++)
         tables[i].classList.add(styles.tableWrapper)
      for(let i =0; i < tableRows.length; i++)
         tableRows[i].classList.add(styles.tableRow)
      for(let i =0; i < tableContent.length; i++)
         tableContent[i].classList.add(styles.tableContent)
   }, [data.htmlData])


   return {data: data.htmlData, metadata: data.metadata, ref}
}
