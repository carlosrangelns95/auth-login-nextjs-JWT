import styles from '../styles/Login.module.css'

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import LoginCard from "../src/components/LoginCard/LoginCard";
import Input from '../src/components/Input/input';
import Button from '../src/components/Button/Button';

import { setCookie } from 'cookies-next';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleFormEdit = (event, name) => {
    setFormData({
      ...formData,
      [name]: event.target.value
    })
  }

  const [error, setErro] = useState('')
  const router = useRouter()

  const handleForm = async (event) => {
    try {
      event.preventDefault()
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify(formData)
      })
      const json = await response.json()
      console.log(json)
      if(response.status !== 200) throw new Error(json)
      
      setCookie('authorization', json)
      router.push('/')
    } catch (error) {
      setErro(error.message)
    }
  }
  


  return (
    <div className={styles.background}>
      <LoginCard title={'Entre em sua conta'}>
        <form onSubmit={handleForm} className={styles.form}>
          <Input type='email' placeholder="Seu e-mail" required value={formData.email} onChange={(e) => handleFormEdit(e, 'email')} />
          <Input type='password' placeholder="Sua senha" required value={formData.password} onChange={(e) => handleFormEdit(e, 'password')} />
          <Button>Entrar</Button>
          {error && <p className={styles.error}>{error}</p>}
          <Link href="/cadastro"> Ainda não possui conta?</Link>
        </form>
      </LoginCard>
    </div>
  )
}