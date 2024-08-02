import { Container } from 'react-bootstrap';
import Api from '../Api/Api';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AddData() {
    let navigator = useNavigate();
    let location = useLocation();

    let [hobbies, setHobbies] = useState([]);
    let [user, setUser] = useState(null);



    useEffect(() => {
        if (location.pathname === '/add-data') 
        {
            setUser(null);
            setHobbies([]);
        }
        else if (location.state)
        {
            setUser(location.state);
            setHobbies(JSON.parse(location.state.data.hobbie) || []);
        }
    }, [location]);
    
    function hobbyHandler(event) {
        let updatedHobbies = [...hobbies];
        if (event.target.checked) {
            updatedHobbies.push(event.target.value);
        } else {
            let index = updatedHobbies.indexOf(event.target.value);
            if (index !== -1) {
                updatedHobbies.splice(index, 1);
            }
        }
        setHobbies(updatedHobbies);
    }

    async function formHandler(event) {
        event.preventDefault();

        let form = document.querySelector('#add-data-form');
        let formData = new FormData(form);
        formData.append('hobbie', JSON.stringify(hobbies));

        try {
            if(location.pathname === '/add-data')
            {
                let response = await Api.post('/create', formData);
                console.log(response.data);
                form.reset();
                navigator('/show-data', {state:response.data, replace: true});
            }
            else
            {
                let response = await Api.post(`/update/${user.data.id}`, formData);
                console.log(response.data);
                form.reset();
                navigator('/show-data', {state:response.data, replace: true});
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container className='d-flex justify-content-center'>
            <form className='w-75 border rounded-4 shadow p-3 pt-1 mb-5' id="add-data-form" onSubmit={formHandler}>
                <div className='mt-3 mb-3'>
                    <label htmlFor="name" className='form-label'>Name:-</label>
                    <input type="text" name='name' placeholder='Enter your name' defaultValue={(user) ? user.data.name : ''} className='form-control' />
                </div>
                <div className='mt-3 mb-3'>
                    <label htmlFor="email" className='form-label'>Email:-</label>
                    <input type="email" name='email' placeholder='Enter your email' defaultValue={(user) ? user.data.email : ''} className='form-control' />
                </div>
                <div className='mt-3 mb-3'>
                    <label htmlFor="course" className='form-label'>Course:-</label>
                    <select className='form-control' defaultValue={(user) ? user.data.course : ''} name='course'>
                        <option value="" disabled>Select Course</option>
                        <option value="B.Tech">B.Tech</option>
                        <option value="M.Tech">M.Tech</option>
                        <option value="BCA">BCA</option>
                        <option value="MCA">MCA</option>
                    </select>
                </div>
                <div className='mt-3 mb-3'>
                    <label htmlFor="gender" className='form-label' >Gender:-</label> <br />
                    <input type="radio" value='male' name='gender' defaultChecked={user && user.data.gender === 'male'} className='ms-3' /> Male
                    <input type="radio" value='female' name='gender' defaultChecked={user && user.data.gender === 'female'} className='ms-3' />Female
                </div>
                <div className='mt-3 mb-3'>
                    <label htmlFor="name">Hobbies:-</label> <br />
                    <input type="checkbox" name='hobbie' checked={hobbies.includes('BGMI')} onChange={hobbyHandler} value='BGMI' className='ms-2 me-1 mt-2' /> BGMI
                    <input type="checkbox" name='hobbie' checked={hobbies.includes('PUBG')} onChange={hobbyHandler} value='PUBG' className='ms-2 me-1 mt-2' /> PUBG
                    <input type="checkbox" name='hobbie' checked={hobbies.includes('Free-Fire')} onChange={hobbyHandler} value='Free-Fire' className='ms-2 me-1 mt-2' /> Free Fire
                </div>
                <div className='mt-3 mb-3'>
                    <label htmlFor="photo" className='form-label'>Photo:-</label>
                    <input type="file" accept="image/*" name='photo' className='form-control' />
                </div>
                {(user) && <div className='my-photo'>
                    <img src={`http://localhost:8000/Images/${user.data.photo}`} alt="" />
                </div>}
                <input type="submit" name="submit" id="submit" value={(user) ? 'Update Data' : 'Add Data'} className={(user) ? 'btn btn-success' : 'btn btn-danger'} />
            </form>
        </Container>
    );
}
