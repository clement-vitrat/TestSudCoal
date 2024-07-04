'use client'

import { useEffect, useState } from 'react'
import { fetchTypePost } from '@/lib/utils/utils.service'
import { TypePost } from '@/lib/entities/utils.entity'
import { toast } from 'react-toastify'
import { createRessource } from '@/lib/ressource/ressource.service'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

export default function AjoutRessource() {
  const connectedUser = useSelector((state: RootState) => state.token)
  const [options, setOptions] = useState<TypePost[]>([])
  const [input, setInput] = useState({
    title: '',
    content: '',
    typePostId: 0
  })

  useEffect(() => {
    fetchTypePostHandler()
  }, [])

  const fetchTypePostHandler = async () => {
    const res = await fetchTypePost()
    if (res.data) {
      setOptions(res.data)
    }
  }

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    console.log(e.target.value)
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await createRessource(input, connectedUser.token as string)
    if (res === 200) {
      toast.success('Ressource ajoutee avec succes')
    } else {
      toast.error('Une erreur est survenue')
    }
  }

  return (
    <>
      <section className="formulaire">
        <div className="container">
          <div className="form">
            <h2>Ajouter une ressource</h2>
            <p className="infoform">
              Les champs précédés d'une étoile (*) sont obligatoires.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Titre de la ressource *</label>
                <input
                  type="text"
                  title="title"
                  name="title"
                  className="input"
                  value={input.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="select_region">Type de ressource</label>
                <select
                  className="select-region"
                  name="typePostId"
                  value={input.typePostId}
                  onChange={handleChangeSelect}
                  required
                >
                  <option value="">Selectionner...</option>
                  {options.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.libelle}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="description">Contenu *</label>
                <textarea
                  title="description"
                  name="content"
                  cols={20}
                  rows={7}
                  className="textarea"
                  value={input.content}
                  onChange={handleChangeTextArea}
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-btn">
                Ajouter ma ressource
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
