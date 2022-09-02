import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../../redux/actions/videogamesActions";
import Spinner from "../../components/Spinner/index";
import NavBar from "../../components/NavBar/index";

export default function Home() {
  let dispatch = useDispatch();
  let videogames = useSelector((state) => state.videogames.videogamesFiltrados);
  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      {videogames.length !== 0 ? (
        videogames.map((v, i) => {
          return (
            <div key={i}>
              <p> {v.name} </p>
            </div>
          );
        })
      ) : (
        <Spinner />
      )}
    </div>
  );
}
