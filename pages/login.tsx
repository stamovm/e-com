import type { NextPage } from 'next'
import Layout from '../components/Layout'

const LoginPage: NextPage = () => {
  return (
    <Layout title="Login">
      <form className="max-w-screen-md mx-auto">
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input id="email" className="w-full" type="email" autoFocus />
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input type="password" className="w-full" id="password" autoFocus />
        </div>
      </form>
    </Layout>
  )
}

export default LoginPage
