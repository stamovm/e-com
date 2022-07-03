import React, { useContext } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Store } from '../utils/Store'

type Props = {
  title: string
  children?: React.ReactNode
}

const Layout = ({ title, children }: Props) => {
  const { state }: any = useContext(Store)
  const { cart } = state

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
                <a className="p-2">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <span className="px-2 py-1 ml-1 text-xs font-bold text-white bg-red-600 rounded-full">
                      {cart.cartItems.reduce(
                        (a: number, c: { quantity: number }) => a + c.quantity,
                        0
                      )}
                    </span>
                  )}
                </a>
              </Link>
              <Link href="/login">
                <a className="p-2">Login</a>
              </Link>
            </div>
          </nav>
        </header>
        <main className="container px-4 m-auto mt-4">{children}</main>

        <footer className="flex items-center justify-center h-10 shadow-inner">
          Footer
        </footer>
      </div>
    </>
  )
}

export default Layout
