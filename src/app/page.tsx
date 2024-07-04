import AccueilAssociations from '@/components/Accueil/accueilassociations'
import AccueilRessources from '@/components/Accueil/accueilressources'
import AccueilStats from '@/components/Accueil/acceuilstats'
import Bienvenue from '@/components/Accueil/bienvenue'

export default function Page() {
  return (
    <>
      <Bienvenue />
      <AccueilAssociations />
      <AccueilRessources />
      <AccueilStats />
    </>
  )
}
