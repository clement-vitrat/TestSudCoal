'use client'

import CrudAdminAsso from '@/components/Admin/Association/crudasso'
import CrudAdminRess from '@/components/Admin/Ressource/crudress'
import CrudAdminUsers from '@/components/Admin/Utilisateur/cruduser'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

export default function Page() {
  const connectedUser = useSelector((state: RootState) => state.token)

  if (!connectedUser || connectedUser.role !== 1) {
    return (
      <>
        <section>
          <div className="container">
            <h1 className="title-crud-admin">Pas un pas de plus</h1>
            <p>Vous n'etes pas autorise a venir par ici.</p>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <section>
        <div className="container">
          <h1 className="title-crud-admin">Crud Admin</h1>
          <CrudAdminUsers />
          <CrudAdminAsso />
          <CrudAdminRess />
        </div>
      </section>
    </>
  )
}
