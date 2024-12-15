import styles from './LoginCard.module.css'

export default function LoginCard({ title,children }) {
  return (

    <div className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </div>

  )
}


{/* <form>

<div>
  <label>E-mail</label>
  <input type='email' />
</div>

<div>
  <label>Password</label>
  <input type='password' />
</div>

<input type='submit' value='Salvar' />

</form> */}