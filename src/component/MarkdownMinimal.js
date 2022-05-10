import React from 'react'
import PropTypes from "prop-types";
import styles from '../styles/Markdown.module.css'

export default function MarkdownMinimal(props) {
    return (
        <article className={styles.article} ref={props.hook.ref} dangerouslySetInnerHTML={{__html: props.hook.data}}/>
    )
}

MarkdownMinimal.propTypes = {
    hook: PropTypes.object.isRequired
}
