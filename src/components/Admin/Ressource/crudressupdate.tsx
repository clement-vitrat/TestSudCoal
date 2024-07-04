'use client'

import React, { useState } from 'react'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { udpateRessource } from '@/lib/ressource/ressource.service'

export default function CrudRessUpdate({ ressource, onUpdate, onClose }) {
  const connectedUser = useSelector((state: RootState) => state.token)

  const [formData, setFormData] = useState({
    title: ressource.title,
    content: ressource.content
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await udpateRessource(
      connectedUser.token as string,
      ressource.id,
      formData
    )
    if (res.data && res.code === 200) {
      toast.success('La ressource a été modifiée')
      onClose(res)
    } else {
      toast.error("La ressource n'a pas été modifiée")
    }
  }

  return (
    <div className="crud-update-form">
      <div className="update-titre">
        <h4>Modification des données de la ressource</h4>
        <button type="button" onClick={onClose} className="button-close">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Titre"
          className="champ-update"
          value={formData.title}
          onChange={handleChange}
        />
        <textarea
          name="content"
          placeholder="Description"
          className="champ-update"
          value={formData.content}
          onChange={handleChangeTextArea}
          cols={3}
          rows={3}
          required
        ></textarea>
        <button type="submit" className="button-update">
          Enregistrer les modifications
        </button>
      </form>
    </div>
  )
}
