import React from 'react'
import { Layout } from 'antd'
import ProductLists from './ProductLists'

const MainContent = () => {
  return (
    <div style={{ flex:1 }}>
        <Layout>
            <ProductLists />
        </Layout>
    </div>
  )
}

export default MainContent