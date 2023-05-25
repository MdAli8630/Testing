
import './App.css';
import {Route,Routes,Navigate} from "react-router-dom";
import Signup from './components/signup';
import Login from "./components/login"
import View from "./components/View"
import EditView from './components/EditView';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' exact element={<Navigate to='/login'></Navigate>}></Route>
      <Route path='/login' element={<Login />} />
        <Route path='/signup' element={ <Signup/>}/>
        <Route path='/view' element={ <View/>}/>
        <Route path='/edit/:id' element={ <EditView/>}/>
      </Routes>
   
    </div>
  );
}

export default App;
