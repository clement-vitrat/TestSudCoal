'use client'

import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { getUserInfo, updateUser } from '@/lib/user/user.service'
import { toast } from 'react-toastify'

export default function CrudUserUpdate({ utilisateur, onUpdate, onClose }) {
  const connectedUser = useSelector((state: RootState) => state.token)

  const [formData, setFormData] = useState({
    firstName: utilisateur.firstName,
    lastName: utilisateur.lastName,
    email: utilisateur.email
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const us = await getUserInfo(connectedUser.token as string)
    if (us === null) {
      return
    }
    const res = await updateUser(
      connectedUser.token as string,
      utilisateur.id,
      formData
    )
    if (res) {
      toast.success("L'utilisateur a ete modifie")
      onClose()
    } else {
      toast.error("L'utilisateur n'a pas ete modifie")
    }
  }

  return (
    <div className="crud-update-form">
      <div className="update-titre">
        <h4>Modification des données de l'utilisateur</h4>
        <button type="button" onClick={onClose} className="button-close">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="Prénom"
          className="champ-update"
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Nom"
          className="champ-update"
          value={formData.lastName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Adresse mail"
          className="champ-update"
          value={formData.email}
          onChange={handleChange}
        />
        <button type="submit" className="button-update">
          Enregistrer les modifications
        </button>
      </form>
    </div>
  )
}
