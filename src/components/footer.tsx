import Image from 'next/image'
import logoMinistere from '../public/logoMinistere.png'
import Link from 'next/link'

export default function Footer() {
  return (
    <>
      <footer>
        <div className="container footer-top">
          <Image
            src={logoMinistere}
            width={150}
            height={20}
            alt="Logo Ministère"
            className="logoMinistere"
          />

          <div className="liengouv">
            <p>
              Un produit de la Direction Interministérielle du Numérique
              (DINUM).
            </p>
            <ul className="liengouv">
              <li>
                <Link className="link active" href="https://legifrance.gouv.fr/">
                  legifrance.gouv.fr
                </Link>
              </li>
              <li>
                <Link className="link active" href="https://www.info.gouv.fr/">
                  gouvernement.fr
                </Link>
              </li>
              <li>
                <Link className="link active" href="https://www.service-public.fr/">
                  service-public.fr
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="container footer-bottom">
          <ul className="reglement">
            <li>
              <Link className="link" href="https://www.data.gouv.fr/fr/pages/legal/legal-notice">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link className="link" href="https://www.data.gouv.fr/fr/pages/legal/cgu">
                Modalités d'utilisation
              </Link>
            </li>
            <li>
              <Link className="link" href="https://www.data.gouv.fr/fr/suivi/">
                Politique de confidentialité
              </Link>
            </li>
            <li>
              <Link className="link" href="https://www.data.gouv.fr/fr/pages/legal/licences">
                Licences
              </Link>
            </li>
            <li>
              <Link className="link" href="https://www.data.gouv.fr/fr/pages/legal/accessibility">
                Accessibilité : partiellement conforme
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </>
  )
}
