import logo from './logo.svg';
import './App.css';
import ResponsiveAppBar from './components/Navigation';
import SignIn from './components/SignIn';
import Button from '@mui/material/Button';
import {Link,Routes,Route,useNavigate} from 'react-router-dom'
function App() {
  const navigate = useNavigate()
  return (
    <div className="App">
      <h2>Welcome to Eshop</h2>
      <div>
        <Button onClick = {()=>navigate('/sign-in')} variant="contained">User</Button>
        <br/>
        <Button style={{marginTop:30}} onClick = {()=>navigate('/supply')} variant="contained">Supplier</Button>
        
      </div>
    </div>
  );
}

export default App;
