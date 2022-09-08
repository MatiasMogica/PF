import "./index.css"

export default function Details({details}) {
    return (
        <div key={details?.idAPI}>
            <div>
                <img alt={details?.name} className="image" src={details?.background_image} />
            </div>
            <div className="infoContainer">
                <div>
                    <h1 className="title">{details?.name}</h1>
                </div>
                <div>
                    <p> {details?.rating} </p>
                </div>
                <div>
                    
                    <p className="html"dangerouslySetInnerHTML={{ __html:details?.description}}/>
                </div>
                <div>
                    <p>{details?.genres.length && details.genres.join(', ') }</p>  
                </div>
                <div>
                <p>{details?.platforms.length && details.platforms.join(', ') }</p>  

                </div>
                <div>
                    <p className="price"> ${details?.price} </p>
                </div>
                <div>
                    <p> {details?.released} </p>
                </div>
            </div>
        </div>
    )
}