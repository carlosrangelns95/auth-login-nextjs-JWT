import styles from  './Button.module.css'

export default function Button({children, ...props}) {
  return (
    <button className={styles.button} {...props}>{children}</button> // {...props} espalha as propriedades para o input
  )
}