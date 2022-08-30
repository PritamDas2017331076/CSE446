import React,{useState} from 'react'
import { useLocation } from 'react-router-dom'
import img from '../images/laptop.jpeg'
import axios from 'axios'
import MyCard from '../components/MyCard'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RemoveIcon from '@mui/icons-material/Remove';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import Navigation from './Navigation'
import AddIcon from '@mui/icons-material/Add';
import ShoppingCartRounded from '@mui/icons-material/ShoppingCartRounded'
import { useNavigate } from 'react-router-dom'
import MyAlert from './MyAlert'
import Alert from '@mui/material/Alert';
import Fade from '@mui/material/Fade';

export default function ProductInfo(props) {
  const navigate = useNavigate()
  const [time,setTime] = useState(0)
  const [alert,setAlert] = useState(0)
  const { state } = useLocation();
  const [count,setCount] = useState(0)
  const [amount,setAmount] = useState(0)
  console.log('product state info',state)
  const desc = (obj)=>{
    return Object.keys(obj).map((keyName, i) => (
      <div style={{textAlign:'left'}} key={i}>
          {/* <span className="input-label">{keyName}: {obj[keyName]}</span> */}
        <Typography> <strong>{keyName}:</strong> {obj[keyName]}</Typography>
      </div>

    ))
  }
  const incrementAmount = ()=>{
    if(count<30){
      setAmount(amount+state.price)
      setCount(count+1)
    }
  }
  const decrementAmount = ()=>{
    if(count>0){
        console.log('decrement ',amount,count)
        setAmount(amount-state.price)
        setCount(count-1)
    }
  }
  const addToCart = ()=>{
    const obj = {
      desc:state.name,
      price:amount,
      piece:count
    }
    console.log('product info obj',obj)
    console.log('id',localStorage.getItem('id'))
    // const item = JSON.stringify(obj)
    // console.log('cart item',item);
    // localStorage.setItem('cart',item)
    axios.patch(`http://localhost:5000/users/addcart/${localStorage.getItem('id')}`,obj)
    .then(res=>{
        console.log('add to cart success',res.data)
      console.log('cart list',res.data.cart)
      const data=JSON.stringify(res.data.cart)
      localStorage.setItem('items',data);
      console.log('items',localStorage.getItem('items'))
       setAlert(1)
      // set alert to false after a fixed second
      // clearTimeout()
      // setTime(setTimeout(()=>{setAlert(0)},3000))
    })
    .catch(res=>{
      console.log('add to cart failed',res)
    })
}
    const checkout = (e)=>{
        e.preventDefault()
        navigate('/cart')
    }
    let textColor='#d5dbdb'
  // this.updateCost()
  return (
    <div>
        <Navigation/>
      <div>
    <div style={{display:'flex',justifyContent:'center',marginTop:70,padding:0}} className='item-wrapper'>
    <Card sx={{ maxWidth: 350,padding:2}}>
        <CardMedia
          component="img"
          image={require(`../images/${state.src}`)}
           alt="green iguana"
          />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {state.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {state.shortDescription}
          </Typography>
        </CardContent>
      
      <CardContent style={{alignItems:'bottom'}}>
        <Typography>
            <AttachMoneyIcon color='primary'/> <strong>Price:</strong>{state.price} TK   
        </Typography>
      </CardContent>
    </Card>
        <div style={{width:300,marginLeft:80,marginTop:80}}> 
            <Card sx={{padding:2}}>
                <Typography variant="h5"> {state.name}</Typography>
                {desc(state.description)}
            </Card>
        </div>
    </div>
    </div>
    <div style={{backgroundColor:'',margin:10}}>
        <div>

        <div style={{backgroundColor:'',height:40,width:800,display:'flex',padding:15}}>
            <div style={{backgroundColor:textColor,height:24,padding:6,marginLeft:220,borderRadius:7}}>
                Quantity:
            </div>
            <button style={{backgroundColor:textColor,height:35,marginLeft:10,borderRadius:7}} onClick={incrementAmount}>
                <AddIcon/>
            </button>
            <div style={{marginLeft:12,marginRight:12,marginTop:10}}>
                {count}
            </div>
            <button style={{backgroundColor:textColor,height:35,marginLeft:5,borderRadius:7}} onClick={decrementAmount}>
                <RemoveIcon/>
            </button>
        <div style={{backgroundColor:textColor,height:24,padding:8,marginLeft:100,borderRadius:7}}>
            Total
        </div>
        <div style={{marginLeft:12,marginRight:12,marginTop:10}}>
                {amount}
        </div>
        </div>
        </div>
        <div>
    <div style={{display:'flex',marginBottom:50}}>
        <Button style={{marginLeft:280,marginTop:10}} variant="contained" startIcon={<ShoppingCartRounded />} onClick = {addToCart}>
            Add to Cart
        </Button>
        <Button style={{marginLeft:50,marginTop:10}} variant="contained"  onClick = {checkout}>
            Checkout
        </Button>
        
        {alert?<Fade in={true} timeout={600}><Alert style={{marginLeft:100}}onClose={()=>setAlert(0)}>Item added to Cart!</Alert></Fade>:<></>}
    </div>
    </div>
    </div>

    </div>
  )
}