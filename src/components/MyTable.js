import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';

import {useState,useEffect} from 'react'
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
export default function MyTable() {
    let [items,setItems] = useState([])
    let [cost,setCost] = useState(0)
    useEffect(()=>{
        setItems(JSON.parse(localStorage.getItem('items')||"[]"))
        console.log('length',items.length)
        console.log('items',items)
      },[])
    const deleteItem = (e,desc,price)=>{
      e.preventDefault()
      console.log('got delete data ',desc,price)
      const obj = {
          desc:desc,price:price,piece:0
      }
      
      axios.patch(`http://localhost:5000/users/addcart/${localStorage.getItem('id')}`,obj)
      .then(res=>{
          console.log('delete item success',res.data)
          console.log('cart list',res.data.cart)
          const data=JSON.stringify(res.data.cart)
          localStorage.setItem('items',data);
          console.log('items',localStorage.getItem('items'))
          setItems(res.data.cart)
      })
      .catch(res=>{
          console.log('delete item failed',res)
      })
    }
  return (
    <div>
      {items.length === 0?<div style={{textAlign:'center'}}>You haven't added anything to cart yet!</div>:
      
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Piece</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align = 'right'></TableCell>
                {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow
                  key={item.desc}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                {item.desc}
                  </TableCell>
                  <TableCell align="right">{item.piece}</TableCell>
                  <TableCell align="right">{item.price}</TableCell>
                  <TableCell align = "right"> <button onClick = {(e)=>deleteItem(e,item.desc,item.price)}><DeleteIcon/></button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
    </div>
  );
}
