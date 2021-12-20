import React from 'react'

const LayoutContainer = ({layout: Layout, children, isPublic}) => {
  return (
    <Layout>
      {children}
    </Layout>
  )
}

export default LayoutContainer
