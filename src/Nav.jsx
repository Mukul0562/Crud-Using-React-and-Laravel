import React from 'react'
import { Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export default function Nav() {
  return (
    <>
        <nav>
            <h1 className='text-center display-1 p-3'>Fullstack Crud Project</h1>
        </nav>
        <div className='d-flex justify-content-around mt-4 mb-5'>
            <NavLink to="/add-data" replace={true} className='text-dark'><Button variant='warning'>Add Data</Button></NavLink>
            <NavLink to="/show-data"  className='text-dark'><Button variant='warning'>Show Data</Button></NavLink>
        </div>
    </>
  )
}
