import React from 'react'
import { Helmet } from 'react-helmet-async'

function ReactHelmet({title, description, keywords,children}) {
  return (
    <>
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="subject" content={description} />
        {keywords&&<meta name="keywords" content={keywords} />}
    </Helmet>
    <div>
        {children}
    </div>
    </>
  )
}

export default ReactHelmet