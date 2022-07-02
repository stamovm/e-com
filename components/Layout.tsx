import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

type Props = {
  title: string
  children?: React.ReactNode
}

const Layout = ({ title, children }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex flex-col justify-between min-h-screen ">
        <header>
          <nav className="flex items-center justify-between h-12 px-4 shadow-md">
            <Link href="/">
              <a className="text-lg font-bold">E-Com</a>
            </Link>
            <div>
              <Link href="/cart">
                <a className="p-2">Cart</a>
              </Link>
              <Link href="/login">
                <a className="p-2">Login</a>
              </Link>
            </div>
          </nav>
        </header>
        <main>{children}</main>

        <footer className="flex items-center justify-center h-10 shadow-inner">
          Footer
        </footer>
      </div>
    </>
  )
}

export default Layout
