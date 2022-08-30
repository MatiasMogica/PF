import { useHistory } from "react-router-dom";
import errorPS2 from "../../images"
import styles from "./Error404.css"

export default function Error404() {

    let history = useHistory();

    function handleClick(){
        history.goBack()
    }

    return (
        <div className={styles.container} >
            <h1>Sorry, that page doesn't exist</h1>
            <img alt="errorPS2"  className={styles.img} src={errorPS2} />
            <div  className={styles.buttonContainer}><button className={styles.button} onClick={handleClick}>{"<== Go Back"}</button></div>
        </div>
    )
}