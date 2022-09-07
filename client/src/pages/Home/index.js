import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../../redux/actions/videogamesActions";
import Spinner from "../../components/Spinner/index";
import NavBar from "../../components/NavBar/index";
import Filtro from "../../components/Filter/Filter";
import Card from "../../components/Card/index"
import Paginated from "../../components/Paginated/index"
import {Slideshow, Slide, TextoSlide} from "../../components/Slider/Slider.js"
import { Link } from "react-router-dom";
import './index.css'


import horizon from '../../images/horizon.jpg'
import stray from '../../images/stray.webp'
import tsushima from '../../images/tsushima.jpg'
import zelda from '../../images/zelda.jpg'

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
            
            
            

            

            
            


           


        <div>
            <Slideshow controles={true} autoplay={false} velocidad="5000" intervalo="7000">
				<Slide>
					
						<img src={zelda} alt=""/>
					
					<TextoSlide colorFondo="navy">
						<p>15% descuento</p>
					</TextoSlide>
				</Slide>
				<Slide>
					
						<img src={horizon} alt=""/>
					
					<TextoSlide>
						<p>15% descuento</p>
					</TextoSlide>
				</Slide>
                <Slide>
					
						<img src={tsushima} alt=""/>
					
					<TextoSlide>
						<p>15% descuento</p>
					</TextoSlide>
				</Slide>
                <Slide>
					
						<img src={stray} alt=""/>
					
					<TextoSlide>
						<p>15% descuento</p>
					</TextoSlide>
				</Slide>
			</Slideshow>
            </div>
            <div className="container_filter_cards">
            <div className="contain_filter">
            <Filtro />
            </div>
              <div className="container_allCards">
                {videogames.length !== 0 ? (
                    currentVg?.map((v, i) => {
                        return (
                                <Card
                                key={i}
                                _id={v._id}
                                idAPI={v.idAPI}
                                name={v.name}
                                image={v.background_image}
                                platforms={v.platforms}
                                released={v.released}
                                rating={v.rating}
                                price={v.price}
                                genres={v.genres} />
                        );
                        })
                    ) : (
                    <Spinner />
                )}</div>
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