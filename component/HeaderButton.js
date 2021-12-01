import styles from "../styles/Navigation.module.css";
import {Ripple} from "mfc-core";
import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import {INLINE_HEADER} from "../utils/regex";

export default function HeaderButton(props) {
    const [open, setOpen] = useState()

    const nestedHeaders = useMemo(() => {
        let stillValid = true
        let nested = []
        props.headers.forEach((h, i) => {
            if (i > props.index && h.variant > props.header.variant && stillValid && h.variant === 3)
                nested.push(h)
            else if(i > props.index)
                stillValid = false
        })

        return nested
    }, [props])


    return (
        <details>
            <summary

                className={styles.button}
                data-highlight={`${props.onHeader === props.header.id}`}
                onClick={() => {
                    setOpen(!open)
                    const element = document.getElementById(props.header.id)
                    console.log(element)
                    if (element) {

                        props.scrollTo(element.getBoundingClientRect().top)
                    }
                }}>
                {props.header.content.replaceAll(INLINE_HEADER[props.header.variant + '-IND'], '')}
                <Ripple/>
            </summary>
            {nestedHeaders.map(nested => (
                <button
                    className={styles.button}
                    data-variant={`${nested.variant}`}
                    data-highlight={`${props.onHeader === nested.id}`}
                    onClick={() => {
                        const element = document.getElementById(nested.id)
                        if (element) {
                            let target = element.parentNode
                            props.scrollTo(element.getBoundingClientRect().top)
                        }
                    }}>
                    {nested.content.replaceAll(INLINE_HEADER[nested.variant + '-IND'], '')}
                    <Ripple/>
                </button>
            ))}

        </details>

    )
}
HeaderButton.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.object),
    header: PropTypes.object,
    index: PropTypes.number,
    scrollTo: PropTypes.func,
    onHeader: PropTypes.string
}