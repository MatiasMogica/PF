import { useHistory,  } from "react-router-dom";
import {Link} from "react-router-dom";
import image from "../../images/logo.png"
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
            <div className="left_container">
                <button className={'button'} onClick={handleClick}>{"<Go Back"}</button>
                <Link to="/" className={'linkStyle'}>Home</Link>
                <Link to="/videogame/add" className={'linkStyle'}>Create game</Link> 
            </div>
            <div>
                <img className="logo" src={image} alt="logo"/>
            </div>
            <div className="right_container">
                <Link  className={'linkStyle'}>Wish List</Link>
                <Link className={'linkStyle'}>Contact</Link>
                <Link className={'linkStyle'}>Sign In</Link>
            </div>
        </div>

        // <>

        //     <nav className="navBar">
        //         <h2 className="logo">Logo<span className="span">app</span></h2>
        //         <ul>
        //             <li><a href=''>Create game</a></li>
        //             <li><a href=''>Wish List</a></li>
        //             <li><a href=''>Contact</a></li>
        //         </ul>
        //         <button className="boton">Login</button>
        //     </nav>

        // </>
    )
}