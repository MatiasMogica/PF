/* eslint no-undef: "off"*/

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../../redux/actions/videogamesActions";
import Spinner from "../../components/Spinner/index";
import NavBar from "../../components/NavBar/index";
import Filtro from "../../components/Filter/Filter";
import Card from "../../components/Card/index"
import Paginated from "../../components/Paginated/index"
import {Slideshow, Slide, TextoSlide} from "../../components/Slider/Slider.js"
import './index.scss'
import horizon from '../../images/horizon.jpg'
import stray from '../../images/stray.webp'
import tsushima from '../../images/tsushima.jpg'
import zelda from '../../images/zelda.jpg'
import { addItem } from "../../redux/slices/cartSlice";
import { AddIcon, CartIcon } from "../../icons/Icons";
import Particle from "../../components/Particle/Particle";
import jquery from 'jquery';

export default function Home() {
    let dispatch = useDispatch();
    let videogames = useSelector((state) => state.videogames.videogamesFiltrados);
    
    const {cartItems} = useSelector((state) => state.cart)

    const [currentPage, setCurrentPage] = useState(1)
    const [vgPerPage, setVgPerPage] = useState(9) // VER CUANTOS VAMOS A RENDERIZAR POR PAG
    const indexOfLastVg = currentPage * vgPerPage
    const indexOfFirstVg = indexOfLastVg - vgPerPage
    const currentVg = Array.isArray(videogames)?videogames.slice(indexOfFirstVg, indexOfLastVg):null
   
    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getVideogames());
        }, [dispatch]);

    return (
        <div className="home">
          <Particle />

            <NavBar />
            
            <div className="containerHome">
            
        <div>
            
            </div>
            <div className="container_filter_cards">
            <div className="contain_filter">
            <Filtro paginated={paginated} />
            </div>
                <div className="container_allCards">

                <div className="slidermargin">
                <Slideshow controles={true} autoplay={true} velocidad="5000" intervalo="3000">
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

                {Array.isArray(videogames)?(videogames.length !== 0 ? (
                    currentVg?.map((v, i) => {
                        const inCart = cartItems.find((i) => i._id === v._id)
                        return (
                            <div className="Card" key={i}>
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
                                {cartItems.includes(inCart) ? <div className="inCart"> <CartIcon /> </div> : <button className="addButton" onClick={() => dispatch(addItem(v))}><AddIcon/></button>}
                            </div>
                        );
                        })
                    ) : (
                    <Spinner />
                )):<div className="not-found"><h2>{videogames.msg}</h2></div>}</div>
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