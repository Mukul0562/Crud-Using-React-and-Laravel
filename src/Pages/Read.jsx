import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Api from '../Api/Api';
import { Table, TableBody, TableCell, TableRow } from 'semantic-ui-react';

export default function Read() {
    let location = useLocation();
    let {id} = location.state;

    let [user, setUser] = useState('');
    let [hobbies ,setHobbies] = useState(null);

    useEffect(function() {
        Api.get(`/show/${id}`)
        .then(response => {
            setUser(response.data);
            setHobbies(JSON.parse(response.data.hobbie).join(', '));
        })
        .catch(error => {
            console.error(error);
        });
    }, [])
        

  return (
    <>
        <div className='d-flex justify-content-around container'>
            <div className='d-flex justify-content-center align-items-center my-photo'>
                <img src={`http://localhost:8000/Images/${user.photo}`} />
            </div>    {/*isme $user.photo se name nikl rha hai */}
            <Table className='w-50 text-center'>
                <TableBody>
                    <TableRow>
                        <TableCell>Name:-</TableCell>
                        <TableCell>{user.name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Email:-</TableCell>
                        <TableCell>{user.email}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Gender:-</TableCell>
                        <TableCell>{user.gender}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Course:-</TableCell>
                        <TableCell>{user.course}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Hobbies:-</TableCell>
                        <TableCell>{hobbies}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </>
  )
}
