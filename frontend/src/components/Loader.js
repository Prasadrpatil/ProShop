import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <div
      style={{
        width: '60px',
        height: '60px',
        margin: 'auto',
        display: 'block',
      }}
      class='lds-dual-ring'
    ></div>
  )
}

export default Loader
