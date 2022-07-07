import React from "react"
import PropTypes from "prop-types"
import styles from "../styles/Markdown.module.css"

export default function Markdown(props) {
    return (
        <article className={[styles.article, props.className].join(' ')} style={props.styles} ref={props.hook.ref} dangerouslySetInnerHTML={{__html: props.hook.data}}/>
    )
}

Markdown.propTypes = {
   className: PropTypes.string,
   styles: PropTypes.object,
    hook: PropTypes.object.isRequired
}
