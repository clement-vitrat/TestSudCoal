'use client'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

export default function Bienvenue() {
  const token = useSelector((state: RootState) => state.token)

  return (
    <>
      <section className="bienvenue">
        <h1 className="container">
          Bienvenue sur le site officiel du Ministère des Solidarités et de la
          Santé
        </h1>

        <div
          className={
            token.identity
              ? 'container content utilisateur'
              : 'container content'
          }
        >
          {token.identity != 'isuser' && (
            <div className="present aos-init aos-animate" data-aos="fade-right">
              <h4>Utilisateur</h4>
              <p>
                En tant qu'utilisateur, vous pourrez interargir avec des
                associations et des utilisateurs.
              </p>
              <p>Vous n'avez pas encore de compte</p>
              <p className="cliquez">Cliquez ci-dessous.</p>
              <Link href="InscrireUser" className="button">
                Créer un compte
              </Link>
              <p>Vous possédez un compte</p>
              <p className="cliquez">Cliquez ci-dessous.</p>
              <Link href="ConnecterUser" className="button">
                Se connecter
              </Link>
            </div>
          )}

          {token.identity != 'isassociation' && (
            <div className="present aos-init aos-animate" data-aos="fade-right">
              <h4>Association</h4>
              <p>
                En tant qu'association, vous pourriez faire découvrir votre
                association et ses ressources.
              </p>
              <p>Qu'attendez-vous pour ajouter votre association</p>
              <p className="cliquez">Cliquez ci-dessous.</p>
              <Link href="InscrireAsso" className="button">
                Ajouter votre association
              </Link>
              <p>Vous possédez un compte</p>
              <p className="cliquez">Cliquez ci-dessous.</p>
              <Link href="ConnecterAsso" className="button">
                Se connecter
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
