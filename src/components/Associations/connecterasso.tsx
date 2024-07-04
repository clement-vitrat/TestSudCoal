'use client'

import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { setToken } from '@/store/tokenSlice'
import { associationLogin } from '@/lib/auth/association.auth'
import Image from 'next/image'

export default function ConnectAsso() {
  const dispatch = useDispatch()
  const [state, setState] = useState({ email: '', password: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await associationLogin(state)
    if (res.data) {
      dispatch(
        setToken({
          token: res.data.token,
          identity: res.data.identity,
          role: 3
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
            <h2>Se connecter à mon association</h2>
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
            <Link href="InscrireAsso">Créer mon compte.</Link>
          </div>
        </div>
      </section>
    </>
  )
}
