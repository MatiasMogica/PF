
import styled from "styled-components";
import {
NavLinkHome
} from "./NavBarStyle";
import LogOut from "../LogOut/LogOut";
import { AiOutlineHome } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { IoGameControllerOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import {BiPurchaseTagAlt} from "react-icons/bi"
import {NavLink as Link} from "react-router-dom";
export default function NavBarAdmin(){

    const user = useSelector((state) => state.logIn.logIn);

    
    return (
        <>
        <Container>
          <ProfileContainer>
            <Avatar src={user.image} />
            <Name>{user.username}</Name>
            <Div>
              <LogOut></LogOut>
            </Div>
          </ProfileContainer>
          <NavMenuAdmin>
            <NavLinkHome to="/home">
              <AiOutlineHome />
              <HLinks>Home</HLinks>
            </NavLinkHome>
            <div className="user">
            <NavLink to="/adminPanel/user">
                <FiUsers/>
                <HLinks>Users</HLinks>
            </NavLink>
            </div>
            <NavLink to="/videogame/add">
              <IoGameControllerOutline />
              <HLinks>Create</HLinks>
            </NavLink>
            <NavLink to="/adminPanel/purchaseOrders">
                <BiPurchaseTagAlt/>
                <HLinks>Orders</HLinks>
            </NavLink>
          </NavMenuAdmin>
        </Container>
        </>
    )
}
const Container = styled.div`
  width: 20%;
  min-height: 97vh;
  border-radius: 2rem;
  background-color: #545479;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  align-self: flex-start;
  position: sticky;
  top: 0.7rem;
  overflow: hidden;
  width: 20%;
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Avatar = styled.img`
  height: 7rem;
  border-radius: 6rem;
  margin-top: 20%;
`;
const Name = styled.h3`
  color: white;
  font: 0.5rem;
  font-weight: 400;
  margin: 0.8rem 0 0.5rem 0;
`;
const Div = styled.div`
  padding: 0.3rem 1rem;
  border-radius: 1rem;
  font-weight: 500;
  color: white;
  background-color: #5a8dd4;
  cursor: pointer;
`;
const NavMenuAdmin = styled.div`
  heigth: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 2rem;
  display: flex;
  background-color: #545479;
  flex-direction: column;
  line-height: 1rem;
  &:hover {
    color: #81e6d9;
  }
`;
const HLinks = styled.p`
  padding-left: 0.5rem;
`;

const NavLink= styled(Link)`
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