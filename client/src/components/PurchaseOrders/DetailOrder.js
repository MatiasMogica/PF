export default function DetailOrder({id,username,payment_status, total_price,games,payment_method}){

return (
    <>
    <div>
    <p>id: {id}</p>
    <p>user: {username}</p>
    <p>total: {total_price}</p>
    <p>status: {payment_status}</p>
    </div>
    
    </>
)

}