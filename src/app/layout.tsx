// Appel des fichiers de styles
import '@/styles/bootstrap.min.css'
import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import StoreProvider from '@/store/StoreProvider'
import { ToastContainer } from 'react-toastify'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <title>RSR</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
          integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>
        <StoreProvider>
          <Navbar />
          <div>
            <ToastContainer />
          </div>
          <main>{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  )
}
