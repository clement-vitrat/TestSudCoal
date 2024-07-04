'use client'

import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { userRegister } from '@/lib/auth/user.auth'
import { Region } from '@/lib/entities/utils.entity'
import { fetchRegion } from '@/lib/utils/utils.service'
import { toast } from 'react-toastify'
import { setToken } from '@/store/tokenSlice'

export default function InscriptionUser() {
  const dispatch = useDispatch()

  const [options, setOptions] = useState<Region[]>([])
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    regionId: 0
  })

  useEffect(() => {
    fetchRegionHandler()
  }, [])

  const fetchRegionHandler = async () => {
    const res = await fetchRegion()
    if (res.data) {
      setOptions(res.data)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    console.log(e.target.value)
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await userRegister(formState)
    if (res.data) {
      toast.success('Votre inscription est un succes')
      dispatch(
        setToken({
          token: res.data.token,
          identity: res.data.identity,
          role: res.data.role
        })
      )
    }
  }

  return (
    <>
      <section className="formulaire">
        <div className="container">
          <div className="form">
            <h2>Inscription</h2>
            <p className="infoform">
              Les champs précédés d'une étoile (*) sont obligatoires.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nom">Nom *</label>
                <input
                  type="text"
                  title="nom"
                  name="lastName"
                  className="input"
                  value={formState.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="prenom">Prénom *</label>
                <input
                  type="text"
                  title="prenom"
                  name="firstName"
                  className="input"
                  value={formState.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Adresse email *</label>
                <input
                  type="email"
                  title="email"
                  name="email"
                  className="input"
                  value={formState.email}
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
                  value={formState.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="conf_password">
                  Confirmation du mot de passe *
                </label>
                <input
                  type="password"
                  title="conf_password"
                  name="passwordConfirmation"
                  className="input"
                  value={formState.passwordConfirmation}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="select_region">Region</label>
                <select
                  name="regionId"
                  className="select-region"
                  value={formState.regionId}
                  onChange={handleChangeSelect}
                >
                  <option value="">Selectionner...</option>
                  {options.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
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
                  J'ai lu et j'accepte les conditions générales d'utilisation du
                  service.
                </div>
              </div>
              <button type="submit" className="submit-btn">
                S'inscrire
              </button>
            </form>

            <p className="infoform complform">Vous avez déjà un compte ?</p>
            <Link href="ConnecterUser">Connectez-vous.</Link>
          </div>
        </div>
      </section>
    </>
  )
}
