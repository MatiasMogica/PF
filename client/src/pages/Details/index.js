import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getVideogames } from "../../redux/actions/videogamesActions";


export default function Details() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const {details} = useSelector(state => state.details)

    useEffect(() => {
        dispatch(getVideogames(id))
    }, [dispatch, id])

    return (
        <div>
            {
                <div>
                    
                </div>
            }
        </div>
    )
    
}