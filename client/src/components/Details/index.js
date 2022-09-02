

export default function Details({details}) {
    return (
        <div key={details?._id}>
            <div>
                <h1>{details?.name}</h1>
            </div>
            <div>
                <img alt={details?.name} src={details?.background_image} />
            </div>
            <div>
                <p> {details?.raiting} </p>
            </div>
            <div>
                <p>{details?.description}</p>
            </div>
            <div>
                <p> {details?.released} </p>
            </div>
            
        </div>
    )
}