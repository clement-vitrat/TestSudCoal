'use client'

import { useEffect, useState } from 'react'
import { User, UserFromDB } from '@/lib/entities/user.entity'
import { getUserInfo, updateUser } from '@/lib/user/user.service'
import Image from 'next/image'
import logoMinistere from '@/public/logoMinistere.png'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export default function MonProfil() {
  const token = useSelector((state: RootState) => state.token.token)
  const [user, setUser] = useState<UserFromDB>({
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    regionId: null,
    userRoleId: null,
    createdAt: null,
    updatedAt: null,
    userFollowAssociation: [],
    userRole: null,
    region: null
  })

  useEffect(() => {
    getUserInfo(token as string).then(res => {
      setUser(res.data)
    })
  }, [token])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
  }

  const handleUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const us = await getUserInfo(token as string)
    if (us === null) {
      return
    }
    const res = await updateUser(token as string, us.data.id as number, user)
    if (res) {
      toast.success("L'utilisateur a ete modifie")
    } else {
      toast.error("L'utilisateur n'a pas ete modifie")
    }
  }

  return (
    <>
      <section className="profil">
        <h1 className="container">Mon profil</h1>

        <h2 className="container">Mes informations personnelles</h2>
        <p className="container modif">
          Si vous souhaitez changer vos informations personnelles, il vous
          suffie de renseigner les champs suivants.
        </p>
        <p className="container modif">
          Tous les champs ne sont pas obligatoires.
        </p>
        <section className="container monprofil">
          <div className="container">
            <div className="form">
              <form onSubmit={handleUpdateSubmit}>
                <div className="form-group">
                  <label htmlFor="nom">Nom</label>
                  <input
                    type="text"
                    title="nom"
                    name="lastName"
                    className="input"
                    placeholder="Nom"
                    value={user.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="prenom">Prénom</label>
                  <input
                    type="text"
                    title="prenom"
                    name="firstName"
                    className="input"
                    placeholder="Prénom"
                    value={user.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Adresse email</label>
                  <input
                    type="email"
                    title="email"
                    name="email"
                    className="input"
                    placeholder="Adresse mail"
                    value={user.email}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="submit-btn">
                  Enregistrer mes modifications
                </button>
              </form>
            </div>
          </div>
        </section>

        <h2 className="container">Associations favories</h2>
        <p className="container modif">Liste de vos associations favories</p>
        <div className="favoris-asso">
          {user.userFollowAssociation &&
            user.userFollowAssociation.map(asso => {
              return (
                <div key={asso.id} className="container">
                  <a href={'/Association/' + asso.association.id}>
                    <Image
                      src={logoMinistere}
                      width="auto"
                      height={80}
                      alt=""
                      className="imageasso"
                    />
                    {asso.association.name}
                  </a>
                </div>
              )
            })}
        </div>

        <h2 className="container">Supprimer mon compte</h2>
        <p className="container modif">
          Si vous souhaitez supprimer votre compte, il vous suffie de renseigner
          les champs suivants.
        </p>
        <p className="container modif">Tous les champs sont obligatoires.</p>
        <section className="container monprofil">
          <div className="container">
            <div className="form">
              <form action="" method="post">
                <div className="form-group">
                  <label htmlFor="email">Adresse email</label>
                  <input
                    type="email"
                    title="email"
                    name="email"
                    className="input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Mot de passe</label>
                  <input
                    type="password"
                    title="password"
                    name="password"
                    className="input"
                    required
                  />
                </div>
                <button type="submit" className="submit-btn">
                  Supprimer mon compte
                </button>
              </form>
            </div>
          </div>
        </section>
      </section>
    </>
  )
}
