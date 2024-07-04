// page.tsx
'use client'

import {
  getRessourceById,
  RessourceById
} from '@/lib/ressource/ressource.service'
import { useEffect, useState } from 'react'
import UneRessource from '@/components/Ressources/uneressource'

type PageProps = {
  params: {
    id: string
  }
}

const Post = ({ params }: PageProps) => {
  const { id } = params
  const [ressource, setRessource] = useState<RessourceById | null>(null)

  const handleRessourceById = async () => {
    const res = await getRessourceById(parseInt(id))
    if (res) {
      setRessource(res.data)
    }
  }

  useEffect(() => {
    handleRessourceById()
  }, [id])

  if (!id || !ressource) {
    return <div>Loading...</div>
  }

  return (
    <>
      <UneRessource ressource={ressource} />
    </>
  )
}

export default Post
