import NavBar from "../NavBar/index";
import { Link } from "react-router-dom";
import "./AdminPanel.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getVideogames } from "../../redux/actions/videogamesActions";
import SearchBar from "../SearchBar/SearchBar";
import { getUsers } from "../../redux/actions/usersActions";
import UserSearchBar from "../UserSearchBar/UserSearchBar";
import { FilterUsers } from "../../redux/slices/usersSlice";
import styled from "styled-components";
import { BsTrash } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import User from "./User";

function AdminPanel() {
  const [renderUser, SetRenderUser] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);
  const usuario = () => {
    SetRenderUser(true);
  };
  const userapi = useSelector((state) => state.logIn.logIn);
  const videogames = useSelector(
    (state) => state.videogames.videogamesFiltrados
  );

  function confirmDelete(e) {
    document.getElementById("btn_delete_" + e.target.value).innerText =
      "Are you Sure?";
    document
      .getElementById("btn_delete_" + e.target.value)
      .addEventListener("click", (event) => {
        handleDelete(e);
      });
  }

  async function handleDelete(e) {
    await fetch(`http://localhost:3001/games/${e.target.value}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById(e.target.value).innerText = data.msg;
        document.getElementById(e.target.value).style.color = "red";
      })
      .catch((err) => console.log(err));
  }

  return (
    <Container>

      <NavBar usuario={usuario}/>
      {renderUser? <User/>:
      <MainContent>

        <Welcome>

        <h3>Welcome,<b> {userapi.username}</b></h3>
        <div className="searchBar"> <SearchBar /></div>
       
        </Welcome>
        <div id="admin_panel_videogames">
          
          
          <ContainerGames>
            {
              Array.isArray(videogames)? (videogames.length !== 0 ? (
                  videogames.map((x) => (
                    <EachGame key={x._id} className="admin_panel_videogame">
                    <Parrafo
                      id={x._id}>
                      {x.name}
                    </Parrafo>
                    <BtnTrash
                      className="pointer"
                      onClick={(e) => confirmDelete(e)}
                      id={"btn_delete_" + x._id}
                      value={x._id}>
                      <BsTrash/>
                    
                    </BtnTrash>
                    
                    <LinkEdit to={`/edit/${x._id}`} >
                    <BtnEdit className="pointer" >

                    <FaRegEdit/>
                    </BtnEdit>
                    </LinkEdit>
                  </EachGame>
                  ))) : null
              ) : null } 
          </ContainerGames>
        </div>
      </MainContent>}

    </Container>
  );
}

export default AdminPanel;

const Container=styled.div`
display:flex;
border-radius:2rem;
margin:0.7rem;

`



const MainContent=styled.div`
display:flex;
flex-direction:column;

`
const Welcome=styled.div`
width:80vw;
display:flex;
justify-content:space-around;
align-items:center;

`
const ContainerGames=styled.div`
display:flex;
flex-direction:column;
width:50vw;
margin-top:10%;
margin-left:20vw;
margin-bottom:10%;

`
const BtnTrash=styled.button`
color:#FFFFFF;
background-color:#5A8DD4;
width:40px;
height:40px;
border:none;
border-radius:4px;
`
const LinkEdit=styled(Link)`
text-decoration:none;
`
const BtnEdit=styled.button`
color:#FFFFFF;
background-color:#8068B2;
width:40px;
height:40px;
border:none;
border-radius:4px;

`
const Parrafo=styled.p`
font-size:1rem;

`
const EachGame=styled.div`
height:2rem;
align-items:center;
margin: 20px 0 0 0;
flex-wrap:wrap;

`

