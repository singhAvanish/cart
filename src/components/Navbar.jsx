import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom';
import Badge from 'react-bootstrap/Badge'
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

export default function Navbar() {
  const navigate= useNavigate();
  
  const [cartView,setCartView]=useState(false)
  let data = useCart();
  const handelLogOut=()=>{
    localStorage.removeItem("authToken");
    navigate("/login")

  }
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
  <div className="container-fluid">
    <Link className="navbar-brand fs-1 fst-italic" to="/">Zippy</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
        </li>
        {(localStorage.getItem("authToken"))?
        <li className="nav-item">
          <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
        </li> :""
       }
        
         
        

       
       
      </ul>
      {(!localStorage.getItem("authToken"))?
      <div className='d-flex'>
      <Link className="btn bg-white text-primary mx-1" to="/login">Login</Link>
        
        <Link className="btn bg-white text-primary mx-1" to="/createuser">SignUp</Link>
      </div>
    :<div>
    <div className='btn bg-white text-primary mx-2' onClick={()=>setCartView(true)}>

      My Cart{" "}
      <Badge pill bg='primary'>{data.length===0?null:<>{data.length}</>}</Badge>
    </div>
    {cartView ? <Modal onClose={()=>{setCartView(false)}}><Cart></Cart></Modal>:null}
    
    <div className='btn bg-white text-primary mx-2' onClick={handelLogOut}>
      Logout
    </div>
    </div>
    }
      
    </div>
  </div>
</nav>
      
    </div>
  )
}
