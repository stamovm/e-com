import type { NextPage } from 'next'
import Layout from '../components/Layout'
import data from '../utils/data'
import ProductItem from '../components/ProductItem'

const Home: NextPage = () => {
  return (
    <Layout title="E-Com">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data.products.map((product) => (
          <ProductItem product={product} key={product.slug}></ProductItem>
        ))}
      </div>
    </Layout>
  )
}

export default Home
