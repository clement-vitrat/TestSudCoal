'use client'

import Link from 'next/link'

import { parseISO, format } from 'date-fns'
import logoMinistere from '@/public/logoMinistere.png'
import { fr } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import { ressourcesliste } from '@/donnees/ressources'
import {
  RessourceSearch,
  searchRessource
} from '@/lib/ressource/ressource.service'
import Image from 'next/image'

export default function ListeRessources() {
  const [ressources, setRessources] = useState<RessourceSearch[]>([])
  const [filtreRessource, setFiltreRessource] = useState<{
    keyword: string
    sort: 'asc' | 'desc'
    regionId?: number
    authorId?: number
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
    setFiltreRessource({
      ...filtreRessource,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    searchRessourceHandler()
  }, [filtreRessource])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFiltreRessource({
        ...filtreRessource,
        keyword: inputValue
      })
    }, 500)
    return () => clearTimeout(timeoutId)
  }, [inputValue, 500])

  const searchRessourceHandler = async () => {
    const res = await searchRessource(filtreRessource)
    setRessources(res.data)
  }

  return (
    <>
      <section className="liste double">
        <h1 className="container">Ressources</h1>
        <p className="container modif">
          Recherche parmi les {ressources.length} Ressources présentes sur le
          site.
        </p>

        <div className="container">
          <form className="search search-ressource" action="">
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
              value={filtreRessource.sort}
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

        <div className="container carte-asso-ress carte-ress">
          <div className="row">
            {ressources.map(ressource => (
              <>
                <div className="col col-xs-12 col-sm-12 col-md-6 col-lg-4">
                  <div className="card">
                    <div className="carte carte-ressource">
                      <Link
                        href={`/Ressource/${ressource.id}`}
                        className="lien-ressource"
                      >
                        <div className="image-ressource">
                          <Image
                            src={logoMinistere}
                            width={150}
                            height={20}
                            alt={`${ressource.title} cover`}
                            className="imageRessource"
                          />
                        </div>
                      </Link>
                    </div>

                    <div className="card-body carte-body">
                      <Link
                        href={`/Ressource/${ressource.id}`}
                        className="card-text"
                      >
                        <p>{ressource.title}</p>
                      </Link>
                      <p className="card-info">
                        {ressource.createdAt == ressource.updatedAt && (
                          <time
                            dateTime={ressource.createdAt.toString()}
                            className="date"
                          >
                            Publiée le
                            {format(
                              parseISO(ressource.createdAt.toString()),
                              ' EEEE d MMM yyyy à HH:mm ',
                              { locale: fr }
                            )}
                          </time>
                        )}
                        {ressource.createdAt < ressource.updatedAt && (
                          <time
                            dateTime={ressource.updatedAt.toString()}
                            className="date"
                          >
                            Mise à jour le
                            {format(
                              parseISO(ressource.updatedAt.toString()),
                              ' EEEE d MMM yyyy à HH:mm ',
                              { locale: fr }
                            )}
                          </time>
                        )}
                        par
                        <Link href={`/Association/${ressource.author.id}`}>
                          {' '}
                          {ressource.author.name}
                        </Link>
                      </p>
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
