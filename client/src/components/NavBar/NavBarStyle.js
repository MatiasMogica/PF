import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

export const NavLinkLogo = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
`;
export const NavLinkAdmin = styled(Link)`
  color: #202020;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &:hover {
    color: #999;
  }
`;


export const Nav1=styled.nav`
background: #131419;
height:90px;
display:flex;
justify-content:space-between;
padding:40px;
z-index:10;
`

export const Nav=styled.nav`
background: #000;
height:80px;
display:flex;
justify-content:space-between;
padding:0.5rem calc((100vw - 1000px)/2);
z-index:10;
`

export const NavLink1=styled(Link)`
color:#fff;
display:flex;
align-items:center;
text-decoration:none;
padding:0 1rem;
height:100%;
cursor:pointer;
&.active{
    color:#81E6D9;
}
&:hover{
    color:#81E6D9;
}
`

export const NavLink=styled(Link)`
color:#fff;
display:flex;
align-items:center;
text-decoration:none;
padding:0 1rem;
height:100%;
cursor:pointer;
&.active{
    color:#81E6D9;
}
&:hover{
    color:#81E6D9;
}
`

export const NavLinkHome=styled(Link)`
color:#fff;
display:flex;
align-items:center;
text-decoration:none;
padding:0 1rem;
height:100%;
cursor:pointer;
&.active{
    color:#81E6D9;
}
&:hover{
    color:#81E6D9;
}
`
export const Bars=styled(FaBars)`
display:none;
color:#fff;
@media screen and (max-width:768px){
    display:block;
    position:absolute;
    top:0;
    right:0;
    transform:translate(-100%,75%);
    font-size:1.8rem;
    cursor:pointer;
}
`
export const NavMenu=styled.div`
display:flex;
align-items:center;
margin-right:-34px;
background-color: #ccc;
@media screen and (max-width: 768px) {
    display:none;
}
`

export const NavBtn=styled.nav`
display:flex;
align-items:center;
margin-right:14px;
@media screen and (max-width: 768px) {
    display:none;
}
`
export const NavBtnLink=styled(Link)`
border-radius: 4px;
background:#256ce1;
padding:10px 22px;
color:#fff;
border:none;
outline:none;
cursor:pointer;
transition:all 0.2s ease-in-out;
text-decoration:none;
&:hover{
    transition:all 0.2s ease-in-out;
    background:#fff;
    color:#010606;
}
`
