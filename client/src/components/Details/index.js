import { useEffect, useReducer, useRef } from 'react'
import { GreenLike, RedDisLike, RemoveComment, Star } from "../../icons/Icons";
import axios from "axios"
import "./index.css"
import VanillaTilt from 'vanilla-tilt';
import Particle from '../Particle/Particle';
import Rating from "../../components/Rating/Rating";
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getById } from '../../redux/actions/videogamesActions';

export default function Details({ details }) {

    const dispatch = useDispatch();
    const { id } = useParams();
    const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
    console.log(details)
    useEffect(() => {
        dispatch(getById(id))
    }, [reducerValue, dispatch, id])

    function Tilt(props) {
        const { options, ...rest } = props;
        const tilt = useRef(null);
      
        useEffect(() => {
          VanillaTilt.init(tilt.current, options);
        }, [options]);

        return <div ref={tilt} {...rest} />;
    }

    async function handleClick(reviewId) {
        console.log("Este es id", id);
        try {
          await axios.delete(`http://localhost:3001/reviews/${reviewId}`);
          forceUpdate();
        } catch (error) {
          console.log(error);
        }
      }
    

    return (
        <>
        
        <div class="container-02">
            {/* <Particle /> */}
		<h2>{details.name}</h2>
        <div className='reviewModal'>
        < Rating />
        </div>
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
                    <div className='likesContainer'>
                    <GreenLike /> {details?.likes} - <RedDisLike /> {details?.dislikes}
                    </div>
			</div>
		</div>
        </Tilt> 
		<p><span><p >{details?.platforms.length && details.platforms.join(', ') }</p></span></p>
    {/* {details.comments?.length === [] ? <h1>No comments</h1> : <h1>Comments</h1>} */}
          {details.comments?.map((c) => {
            return (
              <div className='commentsContainer' key={c._id}>
                <button className='removeComment' onClick={() => handleClick(c._id)}><RemoveComment /> </button>
                <p className='commentsText'>{c.comments} | {c.author} </p>
              </div>
            );
          })}
	</div>
    </>
   
    )
}