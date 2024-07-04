'use client'

import Link from 'next/link'

import { parseISO, format } from 'date-fns'
import { ressourcesliste } from '@/donnees/ressources'
import { associationliste } from '@/donnees/associations'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  getAllRessources,
  RessourceById
} from '@/lib/ressource/ressource.service'

export default function AccueilRessources() {
  const [ressources, setRessources] = useState<RessourceById[]>([])

  const fetchRessourcesHandler = async () => {
    const res = await getAllRessources()
    if (res.data) {
      setRessources(res.data)
    }
  }

  useEffect(() => {
    fetchRessourcesHandler()
  }, [])

  return (
    <>
      <section className="liste double ress">
        <h1 className="container">Ressources</h1>

        <div className="container">
          <div className="container carte-asso-ress carte-ress">
            <div className="row">
              {ressources &&
                ressources.map(ressource => (
                  <>
                    <div className="col col-xs-12 col-sm-12 col-md-6 col-lg-4">
                      <div className="card">
                        <div className="carte carte-ressource">
                          <Link
                            href={`/Ressource/${ressource.id}`}
                            className="lien-ressource"
                          >
                            <div className="image-ressource">
                              <img
                                src={
                                  'https://www.interaction01.info/wp-content/uploads/2020/09/DOCUMENTATION-RESSOURCE-1140x400.jpg'
                                }
                                width={150}
                                height={20}
                                alt={`${ressource.title} cover`}
                                className="imageRessource"
                              />
                            </div>
                          </Link>
                        </div>

                        <div className="card-body carte-body">
                          <Link href="Ressource" className="card-text">
                            <p>{ressource.title}</p>
                          </Link>
                          <p className="card-info">
                            {ressource.createdAt == ressource.updatedAt && (
                              <time dateTime={ressource.createdAt.toString()}>
                                Publiée le
                                {format(
                                  parseISO(ressource.createdAt.toString()),
                                  ' dd MM yyyy à HH:mm '
                                )}
                              </time>
                            )}
                            {ressource.createdAt < ressource.updatedAt && (
                              <time dateTime={ressource.updatedAt.toString()}>
                                Mise à jour le
                                {format(
                                  parseISO(ressource.updatedAt.toString()),
                                  ' dd MM yyyy à HH:mm '
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
        </div>
      </section>
    </>
  )
}
