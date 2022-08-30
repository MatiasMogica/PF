import "./index.module.css";

export default function Spinner() {
return (
    <div className={'loadingContainer'}>
        <div className={'loader'}>
            <div></div>
        </div>
    </div>
    );
}