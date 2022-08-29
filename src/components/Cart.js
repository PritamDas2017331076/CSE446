import React, { useEffect,useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme();

export default function Cart() {
    let [items,setItems] = useState([])
    let [cost,setCost] = useState(0)
    useEffect(()=>{
    //     data = [{
    //         desc:'asd',
    //         price:1323,
    //         piece:3
    //     },
    //     {
    //         desc:'efg',
    //         price:3243,
    //         piece:2
    //     },
    //     {
    //         desc:'fsdfs',
    //         price:444,
    //         piece:7
    //     }
    // ]
        setItems(JSON.parse(localStorage.getItem('items')||"[]"))
    },[])
    const handleBuy = (e)=>{
        e.preventDefault()
        const data = new FormData(e.currentTarget);
        const obj = {
          password:data.get('password')
        }
        console.log('password data ',obj)
        axios.post(`http://localhost:5001/users/check/${localStorage.getItem('acc')}`,obj)
        .then(res=>{
            if(res.data._id === localStorage.getItem('acc')){
                console.log('success handleBuy',res.data)
                submit()
            }
            else
                alert('wrong password')
        })
    }
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
    let updateCost = ()=>{
        let cto=0

        items.forEach((val)=>{
          cto+=(cost+val.price*val.piece)
        })
        return cto
      }
      const submit = ()=>{
    
        const id=localStorage.getItem('id')
        const acc=localStorage.getItem('acc')
        const chg={
          cost:updateCost()
        }
        axios.patch(`http://localhost:5001/users/transaction/${acc}`,chg)
          .then(res=>{
            console.log('successfully updated',res.data)
            const chh={ 
              cart:[]
            }
            axios.patch(`http://localhost:5000/users/${id}`,chh)
              .then(res=>{
                console.log('successfully emptied cart',res.data,'id',id)
                const oj=[]
                localStorage.setItem('items',JSON.stringify(oj))
              })
              .catch(err=>{
                console.log('error',err)
              })
              const obj= {
                list: items,
                id: id,
                mobile: localStorage.getItem('mobile'),
                address: localStorage.getItem('address')
              }

              axios.post('http://localhost:5001/users/transaction/tip')
              .then(res=>{
                console.log('tip given to bank',res.data)
              })
              .catch(err=>{
                console.log('error occurred while tipping ',err)
              })
          
              axios.post(`http://localhost:5000/supplies/add`,obj)
                .then(res=>{
                  console.log('successfully added in supply list',res.data)
                  window.location.href='/cart'
                })
                .catch(err=>{
                  console.log('error',err)
                })

              
        
          })
          .catch(err=>{
            console.log('error',err)
            alert('not enough money')
          })
        // const chh={ 
        //   cart:[]
        // }
        // axios.patch(`http://localhost:5000/users/${id}`,chh)
        //   .then(res=>{
        //     console.log('successfully updated',res.data,'id',id)
        //     const oj=[]
        //     localStorage.setItem('items',JSON.stringify(oj))
        //   })
        //   .catch(err=>{
        //     console.log('error',err)
        //   })
    
        // const obj= {
        //   list: items,
        //   id: id,
        //   mobile: localStorage.getItem('mobile'),
        //   address: localStorage.getItem('address')
        // }
    
        // axios.post(`http://localhost:5000/supplies/add`,obj)
        //   .then(res=>{
        //     console.log('successfully added',res.data)
        //   })
        //   .catch(err=>{
        //     console.log('error',err)
        //   })
        //window.location.href='/cart'
    
    
      }
  return (
    <div>
        <div>
            {items.map((item)=>
             <div key={item.desc}>
                name: {item.desc}  piece:{item.piece}  price:{item.price} <button onClick = {(e)=>deleteItem(e,item.desc,item.price)}><DeleteIcon/></button>
             </div>   
            )}
        </div>
        <div>
        <ThemeProvider theme={theme}>
            <Container component="main">
                <CssBaseline />
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                
                <Box component="form" onSubmit={handleBuy} noValidate sx={{ mt: 1 }}>
                    <Typography>Checkout</Typography>
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="password provided by bank"
                    name="password"
                    autoComplete="secret"
                    autoFocus
                    />
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    buy
                    </Button>
                    
                </Box>
                </Box>
                {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
            </Container>
            </ThemeProvider>
        </div>
        <div>
        </div>        
    </div>
  )
}
