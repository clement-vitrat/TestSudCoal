// Appel des fichiers de styles
'use client'

import '@/styles/bootstrap.min.css'
import '@/styles/globals.css'

import Link from 'next/link'
import { ChangeEvent, useState } from 'react'
import { userLogin } from '@/lib/auth/user.auth'
import { useDispatch } from 'react-redux'
import { setToken } from '@/store/tokenSlice'
import { toast } from 'react-toastify'

export default function ConnecterUser() {
  const dispatch = useDispatch()
  const [state, setState] = useState<{ email: string; password: string }>({
    email: '',
    password: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await userLogin(state)
    console.log(res)
    if (res.data) {
      dispatch(
        setToken({
          token: res.data.token,
          identity: res.data.identity,
          role: res.data.role
        })
      )
      toast.success('Bienvenue')
    }
  }

  return (
    <>
      <section className="formulaire">
        <div className="container">
          <div className="form">
            <h2>Se connecter</h2>
            <p className="infoform">
              Les champs précédés d'une étoile (*) sont obligatoires.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Adresse email *</label>
                <input
                  type="email"
                  title="email"
                  name="email"
                  className="input"
                  value={state.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Mot de passe *</label>
                <input
                  type="password"
                  title="password"
                  name="password"
                  className="input"
                  value={state.password}
                  onChange={handleChange}
                  required
                />
                <p className="infoform complform">
                  Vous avez oublié votre mot de passe ?{' '}
                  <Link href="">Réinitialiez-le.</Link>
                </p>
              </div>
              <div className="form-group condition">
                <div className="conditon">
                  <input
                    type="checkbox"
                    title="condition"
                    name="condition"
                    className="checkbox-field"
                    required
                  />
                  Se souvenir de moi.
                </div>
              </div>
              <button type="submit" className="submit-btn">
                Se connecter
              </button>
            </form>

            <p className="infoform complform">
              Vous n'avez pas encore de compte ?
            </p>
            <Link href="InscrireUser">Créer mon compte.</Link>
          </div>
        </div>
      </section>
    </>
  )
}
