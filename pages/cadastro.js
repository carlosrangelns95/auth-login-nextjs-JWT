import styles from '../styles/Cadastro.module.css'

import { useState } from 'react';
import Link from 'next/link';

import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';

import LoginCard from "../src/components/LoginCard/LoginCard";
import Input from "@/src/components/Input/input";
import Button from '@/src/components/Button/Button';

export default function cadastroPage() {
  const [formData, setFormData] = useState({
    name: '',
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
      const response = await fetch('/api/user/cadastro', {
        method: 'POST',
        body: JSON.stringify(formData)
      })
      const json = await response.json()
      console.log(json)
      if(response.status !== 201) throw new Error(json)
      
      setCookie('authorization', json)
      router.push('/')
    } catch (error) {
      setErro(error.message)
    }
  }

  return (
    <div className={styles.background}>
      <LoginCard title={'Crie sua conta'}>
        <form onSubmit={handleForm} className={styles.form}>
          <Input type='text' placeholder="Seu nome" required value={formData.name} onChange={(e) => handleFormEdit(e, 'name')} />
          <Input type='email' placeholder="Seu e-mail" required value={formData.email} onChange={(e) => handleFormEdit(e, 'email')} />
          <Input type='password' placeholder="Sua senha" required value={formData.password} onChange={(e) => handleFormEdit(e, 'password')} />
          <Button>Cadastrar</Button>
          {error && <p className={styles.error}>{error}</p>}
          <Link href="/login"> Já possui uma conta?</Link>
        </form>
      </LoginCard>
    </div>
  )
}