import { Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './Nav';
import AddData from './Pages/AddData';
import ShowData from './Pages/ShowData';
import Read from './Pages/Read';
import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <>
      <Nav/>
      <Routes>
        <Route path='/add-data' element={<AddData/>} />
        <Route path='/show-data' element={<ShowData/>} />
        <Route path='/show-data/update' element={<AddData/>} />
        <Route path='/show-data/read' element={<Read/>} />
      </Routes>
    </>
  );
}

export default App;
