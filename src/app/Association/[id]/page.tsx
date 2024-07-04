'use client'

import MonAssociation from '@/components/Associations/monassociation'
import { useEffect, useState } from 'react'
import { Association, getAssoById } from '@/lib/association/association.service'

type Props = {
  params: {
    id: string
  }
}

export default function Page({ params }: Props) {
  const { id } = params
  const [association, setAssociation] = useState<Association | null>(null)

  const handleAssociationById = async () => {
    const res = await getAssoById(parseInt(id))
    if (res) {
      setAssociation(res.data as Association)
    }
  }

  useEffect(() => {
    handleAssociationById()
  }, [id])

  if (!id || !association) {
    return <div>Loading...</div>
  }

  return (
    <>
      <MonAssociation association={association} />
    </>
  )
}
