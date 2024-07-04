'use client'

import React, { useState } from 'react'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { updateAssociation } from '@/lib/association/association.service'

export default function CrudAssoUpdate({ association, onUpdate, onClose }) {
  const connectedUser = useSelector((state: RootState) => state.token)

  const [formData, setFormDataA] = useState({
    name: association.name,
    email: association.email,
    description: association.description
  })

  const handleChangeA = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataA({ ...formData, [e.target.name]: e.target.value })
  }

  const handleChangeATextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormDataA({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmitA = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await updateAssociation(
      connectedUser.token as string,
      association.id,
      formData
    )
    if (res) {
      toast.success("L'association a été modifiée")
      onClose(res)
    } else {
      toast.error("L'association n'a pas été modifiée")
    }
  }

  return (
    <div className="crud-update-form">
      <div className="update-titre">
        <h4>Modification des données de l'association</h4>
        <button type="button" onClick={onClose} className="button-close">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <form onSubmit={handleSubmitA}>
        <input
          type="text"
          name="name"
          placeholder="Nom"
          className="champ-update"
          value={formData.name}
          onChange={handleChangeA}
        />
        <input
          type="text"
          name="email"
          placeholder="Adresse mail"
          className="champ-update"
          value={formData.email}
          onChange={handleChangeA}
        />
        <textarea
          name="description"
          placeholder="Description"
          className="champ-update"
          value={formData.description}
          onChange={handleChangeATextArea}
          cols={2}
          rows={2}
          required
        ></textarea>
        <button type="submit" className="button-update">
          Enregistrer les modifications
        </button>
      </form>
    </div>
  )
}
