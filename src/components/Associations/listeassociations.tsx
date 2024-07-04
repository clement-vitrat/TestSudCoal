'use client'

import Link from 'next/link'
import logoMinister from '@/public/logoMinistere.png'
import { parseISO, format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import { associationliste } from '@/donnees/associations'
import {
  Association,
  searchAssociation
} from '@/lib/association/association.service'
import Image from 'next/image'

export default function ListeAssociations() {
  const [asso, setAsso] = useState<Association[]>([])
  const [filtreAsso, setFiltreAsso] = useState<{
    keyword: string
    sort: 'asc' | 'desc'
  }>({
    keyword: '',
    sort: 'asc'
  }) //Variable pour filtre Association
  const [inputValue, setInputValue] = useState('')
  const choix = ['asc', 'desc']

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setInputValue(e.target.value)
  }

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    setFiltreAsso({
      ...filtreAsso,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    searchAssoHandler()
  }, [filtreAsso])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFiltreAsso({
        ...filtreAsso,
        keyword: inputValue
      })
    }, 500)
    return () => clearTimeout(timeoutId)
  }, [inputValue, 500])

  const searchAssoHandler = async () => {
    const res = await searchAssociation(filtreAsso)
    setAsso(res.data)
  }

  return (
    <>
      <section className="liste double">
        <h1 className="container">Associations</h1>
        <p className="container modif">
          Recherche parmi les {asso.length} Associations présentes sur le site.
        </p>

        <div className="container">
          <form className="search" action="">
            <div className="input-group">
              <input
                type="text"
                className="form-control barre-recherche"
                name="keyword"
                placeholder="Rechercher..."
                value={inputValue}
                onChange={handleChange}
              />

              <div className="input-group-btn button-recherche">
                <button className="btn btn-default" type="submit">
                  <i className="fa fa-search"></i> Recherche
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="container triage-ressource">
          <div className="form-group triage">
            <label htmlFor="tri" className="">
              Trier&nbsp;par&nbsp;:
            </label>
            <select
              className="form-control barre-recherche barre-triage"
              id="tri"
              name="sort"
              value={filtreAsso.sort}
              onChange={handleChangeSelect}
            >
              {choix.map(yup => {
                return (
                  <option value={yup} key={yup}>
                    {yup === 'asc' ? (
                      <i className="fa-solid fa-sort-up">Croissant</i>
                    ) : (
                      <i className="fa-solid fa-sort-down">Decroissant</i>
                    )}
                  </option>
                )
              })}
            </select>
          </div>
        </div>

        <div className="container carte-asso-ress">
          <div className="row">
            {asso.map(association => (
              <>
                <div className="col col-xs-12 col-sm-12 col-md-6 col-lg-4">
                  <div key={association.id}>
                    <div className="card">
                      <div className="carte">
                        <Link href={`/Association/${association.id}`}>
                          <div className="logo-asso">
                            <Image
                              src={logoMinister}
                              width={150}
                              height={20}
                              alt={`${association.name} cover`}
                            />
                          </div>
                          <div className="nom-asso">
                            <h2>{association.name}</h2>
                          </div>
                        </Link>
                      </div>
                      <div className="card-body carte-body">
                        <p className="card-text">
                          {association.description &&
                          association.description.length > 80
                            ? `${association.description.slice(0, 80)}...`
                            : association.description}
                        </p>
                        <Link
                          href={`/Association/${association.id}`}
                          className="decouvre btn btn-primary"
                        >
                          Découvrez l'association
                        </Link>
                      </div>
                      <div className="carte-date">
                        {association.createdAt == association.updatedAt && (
                          <time
                            dateTime={association.createdAt.toString()}
                            className="date"
                          >
                            Inscription le
                            {format(
                              parseISO(association.createdAt.toString()),
                              ' EEEE d MMM yyyy à HH:mm ',
                              { locale: fr }
                            )}
                          </time>
                        )}
                        {association.createdAt < association.updatedAt && (
                          <time
                            dateTime={association.updatedAt.toString()}
                            className="date"
                          >
                            Mise à jour le
                            {format(
                              parseISO(association.updatedAt.toString()),
                              ' EEEE d MMM yyyy à HH:mm ',
                              { locale: fr }
                            )}
                          </time>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
