import { useHistory } from "react-router-dom";
import {Link} from "react-router-dom";
/* import { useDispatch, useSelector } from "react-redux"; */
import "./index.css"

export default function NavBar() {
    let history = useHistory();
    /* let {amount} = useSelector((state) => state.cart) */

    function handleClick(){
        history.goBack()
    }

    return (
        <div className={'navContainer'}>
            <button className={'button'} onClick={handleClick}>{"<== Go Back"}</button>
            <Link to="/" className={'linkStyle'}>Home</Link>
            <Link to="/videogame/add" className={'linkStyle'}>Add a game</Link> 
        </div>
    )
}