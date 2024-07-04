'use client'

import CrudRessUpdate from '@/components/Admin/Ressource/crudressupdate'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import {
  deleteRessourceById,
  getAllRessources,
  RessourceById
} from '@/lib/ressource/ressource.service'
import { toast } from 'react-toastify'

export default function CrudAdminRess() {
  const connectedUser = useSelector((state: RootState) => state.token)

  const [ressources, setRessources] = useState<RessourceById[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [updatingRessourceId, setUpdatingRessourceId] = useState<number | null>(
    null
  )
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  useEffect(() => {
    fetchRessources()
  }, [])

  const fetchRessources = async () => {
    const res = await getAllRessources()
    setRessources(res.data)
    setIsLoading(false)
  }

  const handleDelete = async (id: number) => {
    const confirmed = confirm(
      'Etes vous sur de vouloir supprimer cette ressource ?'
    )
    if (confirmed) {
      const res = await deleteRessourceById(id, connectedUser.token as string)
      if (res === 200) {
        toast.success('Ressource supprimée')
        fetchRessources()
      } else {
        toast.error('Erreur lors de la suppression de la ressource')
      }
    } else {
      toast.info('Action annulée')
    }
  }

  const handleUpdate = updatedRessource => {
    setRessources(
      ressources.map(ressource =>
        ressource.id === updatedRessource.id ? updatedRessource : ressource
      )
    )
    setUpdatingRessourceId(null)
  }

  const handleCloseUpdateForm = () => {
    fetchRessources()
    setUpdatingRessourceId(null)
  }

  const handleOpenPopup = () => {
    setIsPopupOpen(!isPopupOpen) // Inverse l'état actuel de isPopupOpen
  }

  if (isLoading) {
    return <div>Chargement de la liste des ressources...</div>
  }

  return (
    <div>
      <section className="crud-complet">
        <div className="crud crud-complet container">
          <div className="titre-partie">
            <h1>Liste des ressources</h1>
            <button type="button" className="add" onClick={handleOpenPopup}>
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>

          {isPopupOpen && (
            <div className="form form-crud">
              <h2>Ajouter une ressource</h2>
              <form action="" method="post">
                <div className="form-group">
                  <label htmlFor="title">Titre de la ressource *</label>
                  <input
                    type="text"
                    title="title"
                    name="title"
                    className="input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description *</label>
                  <textarea
                    title="description"
                    name="description"
                    cols={4}
                    rows={2}
                    className="textarea"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn">
                  Ajouter la ressource
                </button>
              </form>
            </div>
          )}

          {ressources.length === 0 ? (
            <p>Aucune ressource</p>
          ) : (
            <ul className="liste-ress">
              {ressources &&
                ressources.map(ressource => (
                  <li key={ressource.id}>
                    <div className="ressource">
                      <div>
                        <p>
                          <strong>Titre :</strong> {ressource.title}
                        </p>
                        <p>
                          <strong>Description :</strong> {ressource.content}
                        </p>
                      </div>
                      <div className="button">
                        <button
                          onClick={() => setUpdatingRessourceId(ressource.id)}
                          className="modif"
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button onClick={() => handleDelete(ressource.id)}>
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
                    <div>
                      {updatingRessourceId === ressource.id && (
                        <CrudRessUpdate
                          ressource={ressource}
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
