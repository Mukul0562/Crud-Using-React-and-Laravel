import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Api from '../Api/Api';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Delete, Edit } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';


export default function ShowData() {
  const [rows, setRows] = useState([]);

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'course', headerName: 'Course', width: 200 },
    {
      field: 'action',
      headerName: 'Action',
      headerAlign: 'center',
      width: 300,
      renderCell: (params) => (
        <div className='d-flex justify-content-center'>
          <NavLink to='/show-data/read' state={{ id: params.row.id } }><Button variant='primary' className='ms-3 me-3 action-btn text-light'><RemoveRedEyeIcon /></Button></NavLink>
          <NavLink to='/show-data/update' state={{ data: params.row }} replace={true}><Button variant='success' className='ms-3 me-3 action-btn text-light'><Edit /></Button></NavLink>
          <NavLink><Button variant='danger' className='ms-3 me-3 action-btn text-light' onClick={() => deleteHandler(params.row.id)}><Delete /></Button></NavLink>
        </div>
      ),
    },
  ];

  async function deleteHandler(id)
  {
    // console.log(id);
    try {
      const response = await Api.get(`/delete/${id}`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    loadApi();
  }


  async function loadApi() {
    try {
      const response = await Api.get('/');
      const dataWithId = response.data.map((item) => ({
        ...item,
        id: item.id, // Directly use item.id
      }));
      setRows(dataWithId);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadApi();
  }, []);

  return (
    <div className='container d-flex justify-content-center'>
      <div style={{ width: '100%', height: 600 }} className='mb-5'>
        <DataGrid rows={rows}  columns={columns}  pageSize={10} />
      </div>
    </div>
  );
}

ShowData.propTypes = {
  rows: PropTypes.array,
  loading: PropTypes.bool,
  columns: PropTypes.array,
};