import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../../redux/actions/videogamesActions";
import Spinner from "../../components/Spinner/index";
import NavBar from "../../components/NavBar/index";
import Filtro from "../../components/Filter/Filter";
import Card from "../../components/Card/index"
import Paginated from "../../components/Paginated/index"
import { Link } from "react-router-dom";
import './index.css'

export default function Home() {
    let dispatch = useDispatch();
    let videogames = useSelector((state) => state.videogames.videogamesFiltrados);

    const [currentPage, setCurrentPage] = useState(1)
    const [vgPerPage, setVgPerPage] = useState(9) // VER CUANTOS VAMOS A RENDERIZAR POR PAG
    const indexOfLastVg = currentPage * vgPerPage
    const indexOfFirstVg = indexOfLastVg - vgPerPage
    const currentVg = videogames.slice(indexOfFirstVg, indexOfLastVg)

    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getVideogames());
        }, [dispatch]);

    return (
        <div className="home">
            <NavBar />
            
            <div className="container">
            
            <Filtro />
            <div className="container_allCards">
                {videogames.length !== 0 ? (
                    currentVg?.map((v, i) => {
                        return (
                        
                                <Card
                                key={i}
                                _id={v._id}
                                name={v.name}
                                image={v.background_image}
                                platforms={v.platforms}
                                released={v.released}
                                rating={v.rating}
                                price={v.price}
                                genre={v.genre} />
                            
                        );
                        })
                    ) : (
                    <Spinner />
                )}
                </div>
            </div>
            <Paginated
            vgPerPage = {vgPerPage}
            videogames = {videogames.length}
            paginated = {paginated}
            />
        </div>
);
}