'use client'

import Link from 'next/link'

import { associationliste } from '@/donnees/associations'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  Association,
  getAssociations
} from '@/lib/association/association.service'

export default function AccueilAssociations() {
  const [asso, setAsso] = useState<Association[]>([])

  const fetchAssoHandler = async () => {
    const res = await getAssociations()
    if (res.data) {
      setAsso(res.data)
    }
  }

  useEffect(() => {
    fetchAssoHandler()
  }, [])

  return (
    <>
      <section className="liste double asso">
        <h1 className="container">Associations</h1>

        <div className="container">
          <div className="container carte-asso-ress">
            <div className="row">
              {asso &&
                asso.map(association => (
                  <>
                    <div className="col col-xs-12 col-sm-12 col-md-6 col-lg-4">
                      <div key={association.id}>
                        <div className="card">
                          <div className="carte">
                            <Link href={`/Association/${association.id}`}>
                              <div className="logo-asso">
                                <img
                                  src={
                                    'https://upload.wikimedia.org/wikipedia/fr/thumb/a/ad/Restos_du_coeur_Logo.svg/1200px-Restos_du_coeur_Logo.svg.png'
                                  }
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
