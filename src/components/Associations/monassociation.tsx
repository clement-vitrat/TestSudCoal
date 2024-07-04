'use client'

import { useEffect, useState } from 'react'
import { parseISO, format } from 'date-fns'
import logoMinistere from '@/public/logoMinistere.png'

import Link from 'next/link'
import Image from 'next/image'
import { Association, getAssoById } from '@/lib/association/association.service'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { addAssoToFavorites, getUserInfo } from '@/lib/user/user.service'

interface Props {
  association: Association
}

export default function MonAssociation({ association }: Props) {
  const connectedUser = useSelector((state: RootState) => state.token)
  const [like, setLike] = useState(false)

  // State pour gérer l'onglet actif
  const [activeTab, setActiveTab] = useState('London')

  useEffect(() => {
    document.getElementById('defaultOpen')?.click()
  }, [])

  const getUserInfoHandler = async () => {
    console.log('getUserInfoHandler is called') // Debug log 1
    if (connectedUser.token) {
      const res = await getUserInfo(connectedUser.token as string)
      console.log('getUserInfo response:', res) // Debug log 2
      if (res.data && res.data.userFollowAssociation) {
        // If the association is in the user userFollowAssociation setLike to true
        // the association id is
        if (
          res.data.userFollowAssociation.find(
            asso => asso.id === parseInt(id_asso as string)
          )
        ) {
          console.log('like')
          setLike(true)
        } else {
          console.log('dislike')
          setLike(false)
        }
      }
    }
  }

  // Fonction pour ouvrir un onglet
  function openCity(event, cityName) {
    var i, tabcontent, tablinks
    tabcontent = document.getElementsByClassName('tabcontent')
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none'
    }
    tablinks = document.getElementsByClassName('tablinks')
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '')
    }
    document.getElementById(cityName).style.display = 'block'
    event.currentTarget.className += ' active'
    setActiveTab(cityName) // Met à jour l'état de l'onglet actif
  }

  const handleAddToFavorite = async () => {
    console.log(
      connectedUser.token + ' ajoute ' + association.id + ' aux favoris'
    )
    const res = await addAssoToFavorites(
      connectedUser.token as string,
      association.id as number
    )
    if (res === 200) {
      setLike(!like)
    }
  }

  return (
    <>
      <section className="myassociation">
        <div className="container">
          <div className="titreasso">
            <Image
              src={logoMinistere}
              width={300}
              height={50}
              alt=""
              className="imageasso"
            />
            <h2>{association.name}</h2>
            {connectedUser && connectedUser.identity === 'isuser' && (
              <button className="btn-asso" onClick={handleAddToFavorite}>
                <i className="fa-regular fa-star filled"></i>{' '}
                {!like ? 'Ajouter aux favoris' : 'Retirer des favoris'}
              </button>
            )}
          </div>

          <div className="association">
            <button
              className={`tablinks ${activeTab === 'Presentation' ? 'active' : ''}`}
              onClick={event => openCity(event, 'Presentation')}
              id="defaultOpen"
            >
              Presentation
            </button>
            <button
              className={`tablinks ${activeTab === 'Ressources' ? 'active' : ''}`}
              onClick={event => openCity(event, 'Ressources')}
            >
              Ressources
            </button>
          </div>

          <div className="infoasso">
            <div id="Presentation" className="tabcontent">
              <h3>Presentation</h3>
              <p>{association.description}</p>
            </div>

            <div id="Ressources" className="tabcontent">
              {connectedUser &&
                connectedUser.identity &&
                connectedUser.identity == 'isassociation' && (
                  <div className="titre-ressource">
                    <h3>Ressources</h3>
                    <Link
                      href={`/AjouterRessource?id=${association.id}`}
                      className="addRessource"
                    >
                      <i className="fa-solid fa-plus"></i>
                    </Link>
                  </div>
                )}

              <div className="container carte-asso-ress carte-ress">
                <div className="row">
                  {association.post &&
                    association.post.map(ressource => (
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
                                  >
                                    Publiée le
                                    {format(
                                      parseISO(ressource.createdAt.toString()),
                                      ' dd MM yyyy à HH:mm '
                                    )}
                                  </time>
                                )}
                                {ressource.createdAt < ressource.updatedAt && (
                                  <time
                                    dateTime={ressource.updatedAt.toString()}
                                  >
                                    Mise à jour le
                                    {format(
                                      parseISO(ressource.updatedAt.toString()),
                                      ' dd MM yyyy à HH:mm '
                                    )}
                                  </time>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
