import Link from 'next/link'

export default function BienvenueUser() {
  return (
    <>
      <section className="bienvenue">
        <h1 className="container">
          Bienvenue sur le site officiel du Ministère des Solidarités et de la
          Santé
        </h1>

        <div className="container content utilisateur">
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
        </div>
      </section>
    </>
  )
}
