import styles from '../../styles/Markdown.module.css'

export default function parseRule(block){
    return `<span class="${styles.divider}"></span>`
}