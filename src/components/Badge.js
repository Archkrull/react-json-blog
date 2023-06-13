import { MDBBadge } from 'mdb-react-ui-kit'
import React from 'react'

const Badge = ({children, styleInfo}) => {
    const colorKey = {
        Fashion: 'primary',
        Travel: 'success',
        Fitness: 'danger',
        Food: 'warning',
        Tech: 'info',
        Sports: 'dark'
    }
  return (
    <p style={styleInfo}>
      <MDBBadge color={colorKey[children]}>{children}</MDBBadge>
    </p>
  )
}

export default Badge