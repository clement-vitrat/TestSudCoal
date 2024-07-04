'use client'
import { ReactNode, useEffect } from 'react'
import { Provider, useDispatch } from 'react-redux'
import { store } from '@/store/index'
import { checkAndSetAuthFromCookie } from '@/lib/helpers/cookies'
import { setToken } from '@/store/tokenSlice'

export default function StoreProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    checkIfUserAuthHandler()
  }, [])

  const checkIfUserAuthHandler = async () => {
    const data = await checkAndSetAuthFromCookie()
    if (data) {
      store.dispatch(
        setToken({
          token: data.token as string,
          identity: data.identity as 'isuser' | 'isassociation',
          role: data.role as number
        })
      )
    }
  }
  return <Provider store={store}>{children}</Provider>
}
