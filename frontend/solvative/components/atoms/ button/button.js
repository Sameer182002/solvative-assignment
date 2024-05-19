'use client'
import styles from "./button.module.css"
export default function Button({
    text = '',
    handleClick = ()=>{}
}){
    return (
        <button onClick={handleClick} className={styles.mainWrapper}>
            {text}
        </button>
    )
}