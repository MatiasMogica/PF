import { useHistory } from "react-router-dom";
import errorPS2 from "../../images/errorPS2.gif"
import "./index.css"

export default function Error404() {

    let history = useHistory();

    function handleClick(){
        history.goBack()
    }

    return (
        <div className={'container'} >
            <h1>Sorry, that page doesn't exist</h1>
            <img alt="errorPS2"  className={'img'} src={errorPS2} />
            <div className={'buttonContainer'}><button className={'button'} onClick={handleClick}>{"<== Go Back"}</button></div>
        </div>
    )
}