import { useEffect, useRef } from 'react'
import { Star } from "../../icons/Icons";
import "./index.css"
import VanillaTilt from 'vanilla-tilt';
import Particle from '../Particle/Particle';

export default function Details({ details }) {


    function Tilt(props) {
        const { options, ...rest } = props;
        const tilt = useRef(null);
      
        useEffect(() => {
          VanillaTilt.init(tilt.current, options);
        }, [options]);

        return <div ref={tilt} {...rest} />;
    }

    return (
        // <div key={details?.idAPI} className="principalll">
        //     <div className="section">
        //         <div className="detalleContainer">
        //             <div className="header">
        //     <div className="imageContainer">
        //         <img alt={details?.name} className="image" src={details?.background_image} />
        //     </div>
        //     <div className="infoContainer">
        //         <div>
        //             <h1 className="title">{details?.name}</h1> 
        //         </div>
        //         <div>
        //             <p className="html"dangerouslySetInnerHTML={{ __html:details?.description}}/>
        //         </div>
        //         <div>
        //             <p className="price"> ${details?.price} </p>
        //         </div>
        //         <div className="ratingContainer">
        //             <p className="info"> {details?.rating}  </p>
        //             <div className="starContainer"> <Star/> </div>
        //         </div>
        //         <div>
        //             <p className="info">{details?.genres.length && details.genres.join(', ') }</p>  
        //         </div>
        //         <div>
        //             <p className="info">{details?.platforms.length && details.platforms.join(', ') }</p>  
        //         </div>
        //         </div>
        //         </div>
        //     </div>
        //     </div>
        // </div>

        // <div className="tododetalle">
        // <section key={details?.idAPI}>
        //     <div className="detalleContainer">
        //         <header>
        //             <div className="header">
        //                 <a href="#" className="logoo">Logo</a>
        //                 <ul>
        //                     <li>Home</li>
        //                     <li>Home</li>
        //                     <li>Home</li>
        //                     <li>Home</li>
        //                 </ul>
        //             </div>
        //         </header>
        //     </div>
        // </section>
        // </div>

        

        <div class="container-02">
            <Particle />
		<h2>{details.name}</h2>
        <Tilt>
		<div class="glassmorphic-card">
			<div class="imgBox">
            <img alt={details?.name} className="image" src={details?.background_image} />
			</div>
			<div class="contentBox">
				<h3>Price: {details.price}$</h3>
				<p><div>
                    <p className="html"dangerouslySetInnerHTML={{ __html:details?.description}}/>
                </div></p>
                {details?.genres.length && details.genres.map((el, index) => {
                    return(
                    <a><span>{el}</span></a>)
                })}
			</div>
		</div>
        </Tilt>
		<p><span><p >{details?.platforms.length && details.platforms.join(', ') }</p></span></p>
	</div>
   
    )
}