
import styled from "styled-components";
// import {
// NavLinkHome
// } from "./NavBarStyle";
import LogOut from "../LogOut/LogOut";
import {HiUsers } from "react-icons/hi";
import {IoGameController} from "react-icons/io5";
import { useSelector } from "react-redux";
import {FaFileContract} from "react-icons/fa"
import {NavLink as Link} from "react-router-dom";
import {AiTwotoneHome} from 'react-icons/ai'

export default function NavBarAdmin(){

    const user = useSelector((state) => state.logIn.logIn);

    
    return (
        <>
        <Container className="navAdmin">
          {/* <ProfileContainer>
            <Avatar src={user.image} />
            <Name>{user.username}</Name>
            <Div>
              <LogOut></LogOut>
            </Div>
          </ProfileContainer> */}
          <NavMenuAdmin>
            <Lista>
              <Div>
            <Avatar src={user.image} />

            <HLinksnew>
            {user.username}
            </HLinksnew>
            
           
            </Div>
          <HLinkslog>
            <LogOut></LogOut>
        </HLinkslog>
            </Lista>
            <Lista>
            <NavLink to="/home">
              <AiTwotoneHome/>
              <HLinks>Home</HLinks>
            </NavLink>
            </Lista>
            <Lista>
            <NavLink to="/adminPanel/user">
                <HiUsers/>
                <HLinks>Users</HLinks>
            </NavLink>
            </Lista>
           <Lista>
            <NavLink to="/videogame/add">
              <IoGameController/>
              <HLinks>Create</HLinks>
            </NavLink>
            </Lista>
            <Lista>
            <NavLink to="/adminPanel/purchaseOrders">
                <FaFileContract/>
                <HLinks>Orders</HLinks>
            </NavLink>
            </Lista>
          </NavMenuAdmin>
        </Container>
        </>
    )
}

const Container = styled.nav`
  width: 5rem;
  height:100vh;
  background-color: #23232e;
  position:fixed; 
  transition: width 200ms ease;
  &:hover {
    width:16rem;
  } 
`
const Lista= styled.li`
width:100%; 
`
const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Avatar = styled.img`

border-radius:50%;
width:60px;
height:60px;


`;
const Name = styled.p`
  color: white;
  font: 0.5rem;
  font-weight: 400;
  margin: 0.8rem 0 0.5rem 0;
`;
const Div = styled.div`
display: flex;
align-items: center;
height: 5rem;
color:#b6b6b6;
text-decoration: none;
padding:0  0.5rem;
margin-bottom: 1rem;

`;
const NavMenuAdmin = styled.ul`
list-style:none;
padding: 0;
margin: 0;
display:flex;
flex-direction: column;
align-items: center;
`;
const HLinks = styled.span`
  display:none;
  margin-left:2rem;
  color:white;
  .navAdmin:hover &{
    display:block;
  }
`;
const HLinksnew = styled.span`
  display:none;
  margin-left:2rem;
  color:white;
  .navAdmin:hover &{
    display:block;
  }
`;
const HLinkslog = styled.span`
  display:none;
  margin:0 5rem 1rem 5rem;
  color:white;
  .navAdmin:hover &{
    display:block;
  }
`;

const NavLink= styled(Link)`
display: flex;
align-items: center;
height: 5rem;
color:#b6b6b6;
text-decoration: none;
filter:grayscale(100%) opacity(0.7);
transition:0.3s;
&:hover {
  filter: grayscale(0%) opacity(1);
  background-color:#141418;
  color:#ececec;
}
> svg{
min-width:2rem;
margin:0 1.5rem;
width:30px;
height:30px;

}

`