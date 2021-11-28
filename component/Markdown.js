import React, {useEffect, useMemo, useState} from 'react'

import PropTypes from "prop-types";
import styles from '../styles/Markdown.module.css'
import markdownParser from "../utils/markdown";
import useCopyToClipboard from "../hooks/useCopyToClipboard";

export default function Markdown(props) {
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

    const [copyTo, setCopyTo] = useState([])

    const copyToClipboard = useCopyToClipboard()
    const data = useMemo(() => {
        if (props.data !== undefined && props.data !== null) {
            const [parsed, ids] = new markdownParser(props.data, id)
            setCopyTo(ids)

            return parsed
        } else
            return ''
    }, [props.data])

    const handleClick = (event) => {
        const el = event.currentTarget.firstChild
        const success = copyToClipboard(event.currentTarget.parentNode.childNodes[2].textContent)
        if(success){
            if(el) {
                el.innerText = 'check'
                el.parentNode.classList.add(styles.successButton)
            }
            setTimeout(() => {
                if(el) {
                    el.parentNode.classList.remove(styles.successButton)
                    el.innerText = 'copy'
                }

            }, 1750)
        }
    }

    useEffect(() => {
        copyTo?.forEach(element => {
            const ref = document.getElementById(element)
            if(ref)
                ref.addEventListener('click', handleClick)
        })
        return () => {
            copyTo?.forEach(element => {
                const ref = document.getElementById(element)
                if(ref)
                    ref.removeEventListener('click', handleClick)
            })
        }
    }, [copyTo])
    return (
        <article className={styles.wrapper} dangerouslySetInnerHTML={{__html: data}}/>
    )
}

Markdown.propTypes = {
    data: PropTypes.string.isRequired
}
