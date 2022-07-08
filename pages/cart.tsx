import type { NextPage } from 'next'
import React, { useContext } from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'
import { Store } from '../utils/Store'
import { useRouter } from 'next/router'
import { XCircleIcon } from '@heroicons/react/outline'
import Image from 'next/image'

type Item = {
  slug: string
  image: string
  name: string
  quantity: number
  countInStock: number
  price: number
}

const CartPage: NextPage = () => {
  const router = useRouter()
  const { state, dispatch }: any = useContext(Store)
  const {
    cart: { cartItems },
  } = state

  const removeItemHandler = (item: Item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item })
  }

  const updateQuantityHandler = (item: Item, qty: string) => {
    const quantity = parseInt(qty)
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } })
  }

  return (
    <Layout title="Shoping Cart">
      <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full ">
              <thead className="border-b">
                <tr>
                  <th className="p-5 text-left">Item</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item: Item) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link href={`/product/${item.slug}`}>
                        <a className="flex items-center">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          ></Image>
                          &nbsp;
                          {item.name}
                        </a>
                      </Link>
                    </td>
                    <td className="p-5 text-right">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantityHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-5 text-right">${item.price}</td>
                    <td className="p-5 text-center">
                      <button onClick={() => removeItemHandler(item)}>
                        <XCircleIcon className="w-5 h-5"></XCircleIcon>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-5 card">
            <ul>
              <li>
                <div className="pb-3 text-xl">
                  Subtotal (
                  {cartItems.reduce((a: number, c: Item) => a + c.quantity, 0)})
                  : $
                  {cartItems.reduce(
                    (a: number, c: Item) => a + c.quantity * c.price,
                    0
                  )}
                </div>
              </li>
              <li>
                <button
                  onClick={() => router.push('/shipping')}
                  className="w-full primary-button"
                >
                  Check Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default CartPage
