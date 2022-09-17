import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Spinner from "../../components/Spinner";
import { getById } from "../../redux/actions/videogamesActions";
import Details from "../../components/Details";
import { clearVideogame } from "../../redux/slices/videogamesSlice";
import { CartIcon } from "../../icons/Icons";
import Rating from "../../components/Rating/Rating";

export default function DogDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { details } = useSelector((state) => state.videogames);
  const {amount} = useSelector((state) => state.cart)

  useEffect(() => {
    dispatch(getById(id));
    return () => {
      dispatch(clearVideogame());
    };
  }, [dispatch, id]);

  return (
    <div>
      {
        <div>
          <NavBar />
          <div className="floatContainer">
                    <Link className="cartLink" to="/cart" >
                        {amount}
                        <div className="float"><CartIcon /></div>
                    </Link>
                </div>
          {Object.keys(details).length > 0 ? (
            <Details details={details} />
          ) : (
            <Spinner />
          )}
        {/* <Rating />  */}
        </div>
      }
    </div>
  );
}