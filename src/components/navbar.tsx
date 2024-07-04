'use client'

import Image from 'next/image'
import logoMinistere from '@/public/logoMinistere.png'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { resetToken, setToken } from '@/store/tokenSlice'
import { toast } from 'react-toastify'
import { getAssoInfo } from '@/lib/association/association.service'

export default function Navbar() {
  const token = useSelector((state: RootState) => state.token)
  const pathname = usePathname()
  const dispatch = useDispatch()

  const [menuUser, setMenuUser] = useState<
    { name: string; href: string; icon: string; onClick?: boolean }[]
  >([
    { name: ' Se connecter', href: '/ConnecterUser', icon: 'fa-solid fa-lock' },
    {
      name: " S'enregistrer",
      href: '/InscrireUser',
      icon: 'fa-solid fa-circle-user'
    }
  ])

  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (token.token) {
      if (token.identity == 'isuser') {
        setMenuUser([
          {
            name: ' Mon profil',
            href: '/ProfilUser',
            icon: 'fa-solid fa-id-card'
          }
        ])
      } else if (token.identity == 'isassociation') {
        getAssoInfoHandler()
      }
    } else {
      setMenuUser([
        {
          name: ' Se connecter',
          href: '/ConnecterUser',
          icon: 'fa-solid fa-lock'
        },
        {
          name: " S'enregistrer",
          href: '/InscrireUser',
          icon: 'fa-solid fa-circle-user',
          onClick: true
        }
      ])
    }
  }, [token.identity, token.token])

  // Liste des liens a afficher dans le menu.
  const chxMenu = [
    { name: ' Accueil', href: '/', icon: 'fa-solid fa-house' },
    {
      name: ' Associations',
      href: '/ListeAssociations',
      icon: 'fa-solid fa-people-arrows'
    },
    {
      name: ' Ressources',
      href: '/ListeRessources',
      icon: 'fa-solid fa-puzzle-piece'
    }
  ]

  const getAssoInfoHandler = async () => {
    const res = await getAssoInfo(token.token as string)
    if (res.data) {
      setMenuUser([
        {
          name: ' Mon association',
          href: '/Association/' + res.data.id,
          icon: 'fa-solid fa-id-card'
        }
      ])
    }
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleSignoff = () => {
    dispatch(resetToken({ token: null, identity: null, role: null }))
    toast.success('Au revoir')
  }

  return (
    <>
      <nav>
        <div className="container">
          <div className="container menu-top">
            <Link href="/">
              <Image
                src={logoMinistere}
                width={150}
                height={20}
                alt="Logo Ministère"
                className="logoMinistere"
              />
            </Link>
            <a href="javascript:void(0);" className="icon" onClick={toggleMenu}>
              <i className="fa fa-bars"></i>
            </a>
            <ul className="connexion menu">
              {menuUser.map(chUser => {
                return (
                  <>
                    <li>
                      <Link
                        key={chUser.name}
                        href={chUser.href}
                        className={clsx('link', {
                          active: pathname === chUser.href
                        })}
                      >
                        <i className={chUser.icon}></i>
                        {chUser.name}
                      </Link>
                    </li>
                  </>
                )
              })}
              {token.token && (
                <li>
                  <a className="link-deco" onClick={handleSignoff}>
                    <i className="fa-solid fa-user-slash"></i> Deconnexion
                  </a>
                </li>
              )}
              {token.role && token.role === 1 && (
                <li>
                  <a className="link-deco" href={'/CrudAdmin'}>
                    <i className="fa-solid fa-screwdriver-wrench"></i> CRUD
                    Admin
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="container menu-bottom">
          <ul className="menu">
            {chxMenu.map(chMenu => {
              return (
                <>
                  <li>
                    <Link
                      key={chMenu.name}
                      href={chMenu.href}
                      className={clsx('link', {
                        active: pathname === chMenu.href
                      })}
                    >
                      <i className={chMenu.icon}></i>
                      {chMenu.name}
                    </Link>
                  </li>
                </>
              )
            })}
          </ul>
        </div>

        <div className="tel">
          <div className="tel container">
            <div id="myLinks" style={{ display: menuOpen ? 'block' : 'none' }}>
              <div className="">
                <div className="container menu-top">
                  <ul className="connexion">
                    {menuUser.map(chUser => {
                      return (
                        <>
                          <li>
                            <Link
                              key={chUser.name}
                              href={chUser.href}
                              className={clsx('link', {
                                active: pathname === chUser.href
                              })}
                            >
                              <i className={chUser.icon}></i>
                              {chUser.name}
                            </Link>
                          </li>
                        </>
                      )
                    })}
                    {token.token && (
                      <li>
                        <button className="submit-btn" onClick={handleSignoff}>
                          Deconnexion
                        </button>
                      </li>
                    )}
                    {token.role && token.role === 1 && (
                      <li>
                        <a className="link-deco" href={'/CrudAdmin'}>
                          <i className="fa-solid fa-screwdriver-wrench"></i>{' '}
                          CRUD Admin
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="container menu-bottom">
                <ul className="">
                  {chxMenu.map(chMenu => {
                    return (
                      <>
                        <li>
                          <Link
                            key={chMenu.name}
                            href={chMenu.href}
                            className={clsx('link', {
                              active: pathname === chMenu.href
                            })}
                          >
                            {chMenu.name}
                          </Link>
                        </li>
                      </>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
