import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { CartIcon, Trash } from "../../icons/Icons";
import { clearWishList } from "../../redux/slices/wishListSlice";
import WishListItem from "./WishListItem";


export default function WishList() {
    
    const dispatch = useDispatch()
    const {wishedItems, wishedAmount} = useSelector((state) => state.wishList)
    const {amount} = useSelector((state) => state.cart)
    const [search, setSearch] = useState("")

    function filteredGames() {
        if(search.length === 0) {
            return wishedItems;
        } 
        const filtered = wishedItems.filter(d => d.name.toLowerCase().includes(search.toLowerCase()))
        if(filtered.length === 0) {
            console.log("Sorry, we couldn't find that game")
        } 
        return filtered
    }

    function handleOnSearch(e) {
        setSearch(e.target.value)
    }

    

    if(wishedAmount < 1) {
        return (
            <div>
                <NavBar />
                <div className='empty'>
                    <h1>Your WishList is currently empty</h1>
                    {/* <img alt="cart" className='emptyCart' src={emptyCart} /> */}
                    <div className="floatContainer">
                    <Link className="cartLink" to="/cart" >
                        {amount}
                        <div className="float"><CartIcon /></div>
                    </Link>
            </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <NavBar />
            <div className="floatContainer">
                    <Link className="cartLink" to="/cart" >
                        {amount}
                        <div className="float"><CartIcon /></div>
                    </Link>
            </div>
            <div className="container_search">
        <h4>Search by keyword</h4>
            <div className="searchBar">
                <input
                    type="text"
                    id="buscarfiltro"
                    placeholder="search a game"
                    className="buscar"
                    onChange={(e) => handleOnSearch(e)}
                ></input></div>
                <button className='clearButton' onClick={() => dispatch(clearWishList())}><Trash /></button>
            </div>
                <div>
                {
                    filteredGames().map((item) => {
                        return <WishListItem key={item.idAPI} {...item} />
                    }) 
                }
                </div>
            </div>
    )
}