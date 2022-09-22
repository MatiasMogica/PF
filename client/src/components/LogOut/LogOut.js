import { useDispatch } from "react-redux";
import { localStorageUser } from "../../redux/slices/logInSlice";
import styled from "styled-components"
import {useHistory} from "react-router-dom";
import { clearCart } from "../../redux/slices/cartSlice";

function LogOut() {
  const dispatch = useDispatch();
const history=useHistory()
  function handlelogOut() {
    window.localStorage.setItem("user", JSON.stringify({ status: false }));
    dispatch(localStorageUser({ status: false }));
    dispatch(clearCart())
    history.replace('/')
  }
  
  return <BtnLogout onClick={() => handlelogOut()}>Log Out</BtnLogout>;
}
const BtnLogout=styled.button`
padding : 0.3rem 1rem ;
border-radius : 1rem ;
font-weight : 500 ;
font-size :1rem;
color: white ;
background-color :#5A8DD4;
cursor: pointer ;
border:none;

`

export default LogOut;
