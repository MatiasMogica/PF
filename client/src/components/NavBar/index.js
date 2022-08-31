import { useHistory } from "react-router-dom";
import {Link} from "react-router-dom";
import "./index.css"

export default function NavBar() {

    let history = useHistory();

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