import React,{useState, useEffect} from 'react'
// import image from '../images/cross.jpg'
import axios from 'axios'
// import './Supply.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
// import Typography from '@mui/material/Typography';
import MyTable from './MyTable'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';

const Supply = () => {
  const [supply,setSupply]=useState([])
  useEffect(()=>{
    axios.get('http://localhost:5000/supplies')
            .then(res => {
                console.log(res.data) 
                setSupply(res.data)
                console.log('supply',supply)
           }) ;
  },[])
  const deletedata = (e,id)=>{
    e.preventDefault()
    axios.delete(`http://localhost:5000/supplies/${id}`)
        .then(res => {
            console.log(res.data) 
            window.location.href='/supply'
        }) ;
  }
  console.log('supply',supply)
  return (
    <div className="data" >
            {
                supply.map(item => (
                <div key={item._id}  className="border" style={{marginTop:50,padding:30}}>
                    <div style={{display:'inline-flex',width:600}}>
                    <Card style={{padding:30}}>
                       
                    <TableBody>
                    {item.list.map((item) => (
                        <TableRow
                        key={item.desc}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                        {item.desc}
                        </TableCell>
                        <TableCell align="right">{item.piece}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <div>
                    {/* {
                        item.list.map(it=>(
                            <h3>{it.desc}---{it.piece}</h3>
                            ))
                    } */}
                    </div>
                    <Typography>
                        <strong>Address:</strong> {item.address}
                    </Typography>
                    <Typography>
                        <strong>Mobile: </strong>{item.mobile}
                    </Typography>
                    <div style={{marginLeft:50}}>
                    </div>                    
                     </Card>
                     <button style={{align:'center'}} onClick = {(e)=>deletedata(e,item._id)}><DeleteIcon/></button>
                     </div>
                </div>
                ))
            }
    </div>
  )
}

export default Supply
