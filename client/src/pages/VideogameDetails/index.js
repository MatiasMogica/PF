import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Spinner from "../../components/Spinner";
import { getById } from "../../redux/actions/videogamesActions";
import Details from "../../components/Details";
import { clearVideogame } from "../../redux/slices/videogamesSlice";

export default function DogDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { details } = useSelector((state) => state.videogames);

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
          {Object.keys(details).length > 0 ? (
            <Details details={details} />
          ) : (
            <Spinner />
          )}
        </div>
      }
    </div>
  );

}