'use client'

import CrudAssoUpdate from './crudassoupdate'
import React, { useState, useEffect } from 'react'
import {
  Association,
  deleteAssociationById,
  getAssociations
} from '@/lib/association/association.service'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export default function CrudAdminAsso() {
  const connectedUser = useSelector((state: RootState) => state.token)

  const [associations, setAssociations] = useState<Association[]>([])
  const [isLoading, setIsLoadingA] = useState(true)
  const [updatingAssociationId, setUpdatingAssociationId] = useState<
    number | null
  >(null)
  const [isPopupOpen, setIsPopupOpenA] = useState(false)

  useEffect(() => {
    fetchAssociations()
  }, [])

  const fetchAssociations = async () => {
    const res = await getAssociations()
    setAssociations(res.data)
    setIsLoadingA(false)
  }

  const handleDeleteA = async (id: number) => {
    const confirmed = confirm(
      'Etes vous sur de vouloir supprimer cette association ?'
    )
    if (confirmed) {
      const res = await deleteAssociationById(id, connectedUser.token as string)
      if (res === 200) {
        toast.success('Association supprimée')
        fetchAssociations()
      } else {
        toast.error("Erreur lors de la suppression de l'association")
      }
    } else {
      toast.info('Action annulée')
    }
  }

  const handleUpdateA = updatedAssociation => {
    // Met à jour l'association dans la liste des associations
    setAssociations(
      associations.map(association =>
        association.id === updatedAssociation.id
          ? updatedAssociation
          : association
      )
    )
    // Réinitialise l'ID de l'association en cours de mise à jour après la mise à jour réussie
    setUpdatingAssociationId(null)
  }

  const handleCloseUpdateFormA = () => {
    fetchAssociations()
    setUpdatingAssociationId(null)
  }

  const handleOpenPopupA = () => {
    setIsPopupOpenA(!isPopupOpen) // Inverse l'état actuel de isPopupOpen
  }

  if (isLoading) {
    return <div>Chargement de la liste des associations...</div>
  }

  return (
    <div>
      <section className="crud-complet">
        <div className="crud crud-complet container">
          <div className="titre-partie">
            <h1>Liste des associations</h1>
            {/*<button type="button" className="add" onClick={handleOpenPopupA}>*/}
            {/*  <i className="fa-solid fa-plus"></i>*/}
            {/*</button>*/}
          </div>

          {isPopupOpen && (
            <div className="form form-crud">
              <h2>Inscrire mon association</h2>
              <form action="" method="post">
                <div className="form-group">
                  <label htmlFor="nom">Nom de l'association *</label>
                  <input
                    type="text"
                    title="nom"
                    name="nom"
                    className="input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nbcerfa">Numéro de CERFA *</label>
                  <input
                    type="text"
                    title="nbcerfa"
                    name="nbcerfa"
                    className="input"
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
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description *</label>
                  <textarea
                    title="description"
                    name="description"
                    cols={2}
                    rows={2}
                    className="textarea"
                    required
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Mot de passe *</label>
                  <input
                    type="password"
                    title="password"
                    name="password"
                    className="input"
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
                    name="conf_password"
                    className="input"
                    required
                  />
                </div>
                <button type="submit" className="submit-btn">
                  Enregistrer l'association
                </button>
              </form>
            </div>
          )}

          {associations.length === 0 ? (
            <p>Aucune association</p>
          ) : (
            <ul className="liste-assos">
              {associations.map(association => (
                <li key={association.id}>
                  <div className="asso">
                    <div>
                      <p>
                        <strong>Nom :</strong> {association.name}
                      </p>
                      <p>
                        <strong>Email :</strong> {association.email}
                      </p>
                      <p>
                        <strong>Description :</strong> {association.description}
                      </p>
                    </div>
                    <div className="button">
                      <button
                        onClick={() => setUpdatingAssociationId(association.id)}
                        className="modif"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button onClick={() => handleDeleteA(association.id)}>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                  <div>
                    {updatingAssociationId === association.id && (
                      <CrudAssoUpdate
                        association={association}
                        onUpdate={handleUpdateA}
                        onClose={handleCloseUpdateFormA}
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
