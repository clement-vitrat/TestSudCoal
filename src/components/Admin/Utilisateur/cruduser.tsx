'use client'

import CrudUserUpdate from './cruduserupdate'
import React, { useState, useEffect } from 'react'
import { userRegister } from '@/lib/auth/user.auth'
import { Region } from '@/lib/entities/utils.entity'
import { fetchRegion } from '@/lib/utils/utils.service'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { deleteUser, getAllUsers } from '@/lib/user/user.service'
import { UserFromDB } from '@/lib/entities/user.entity'

export default function CrudAdminUsers() {
  const connectedUser = useSelector((state: RootState) => state.token)

  const [utilisateurs, setUtilisateurs] = useState<UserFromDB[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [updatingUtilisateurId, setUpdatingUtilisateurId] = useState<
    number | null
  >(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

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
    fetchUtilisateurs()
  }, [])

  const fetchUtilisateurs = async () => {
    const res = await getAllUsers()
    setUtilisateurs(res.data)
    setIsLoading(false)
  }

  const handleDelete = async (id: number) => {
    const confirmed = confirm(
      'Etes vous sur de vouloir supprimer cet utilisateur ?'
    )
    if (confirmed) {
      const res = await deleteUser(id, connectedUser.token as string)
      if (res === 200) {
        toast.success('Utilisateur supprimé')
        fetchUtilisateurs()
      } else {
        toast.error('Échec de la suppression')
      }
    } else {
      toast.info('Action annulée')
    }
  }

  const handleUpdate = updatedUtilisateur => {
    // Met à jour de l'utilisateur dans la liste des utilisateurs
    setUtilisateurs(
      utilisateurs.map(utilisateur =>
        utilisateur.id === updatedUtilisateur.id
          ? updatedUtilisateur
          : utilisateur
      )
    )
    // Réinitialise l'ID de l'utilisateur en cours de mise à jour après la mise à jour réussie
    setUpdatingUtilisateurId(null)
  }

  const handleCloseUpdateForm = () => {
    fetchUtilisateurs()
    setUpdatingUtilisateurId(null)
  }

  const handleOpenPopup = () => {
    setIsPopupOpen(!isPopupOpen) // Inverse l'état actuel de isPopupOpen
  }

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
    }
  }

  if (isLoading) {
    return <div>Chargement de la liste des utilisateurs...</div>
  }

  return (
    <div>
      <section className="crud-complet">
        <div className="crud crud-complet container">
          <div className="titre-partie">
            <h1>Liste des utilisateurs</h1>
            {/*<button type="button" className="add" onClick={handleOpenPopup}>*/}
            {/*  <i className="fa-solid fa-plus"></i>*/}
            {/*</button>*/}
          </div>

          {isPopupOpen && (
            <div className="form form-crud">
              <h2>Inscription</h2>

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
                <button type="submit" className="submit-btn">
                  Inscrire l'utilisateur
                </button>
              </form>
            </div>
          )}

          {utilisateurs.length === 0 ? (
            <p>Aucun utilisateur</p>
          ) : (
            <ul className="liste-users">
              {utilisateurs.map(utilisateur => (
                <li key={utilisateur.id}>
                  <div className="user">
                    <div>
                      <p>
                        <strong>Prénom :</strong> {utilisateur.firstName}
                      </p>
                      <p>
                        <strong>Nom :</strong> {utilisateur.lastName}
                      </p>
                      <p>
                        <strong>Email :</strong> {utilisateur.email}
                      </p>
                    </div>
                    <div className="button">
                      <button
                        onClick={() => setUpdatingUtilisateurId(utilisateur.id)}
                        className="modif"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button onClick={() => handleDelete(utilisateur.id)}>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                  <div>
                    {updatingUtilisateurId === utilisateur.id && (
                      <CrudUserUpdate
                        utilisateur={utilisateur}
                        onUpdate={handleUpdate}
                        onClose={handleCloseUpdateForm}
                      />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  )
}
