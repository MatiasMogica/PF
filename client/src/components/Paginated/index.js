import React from "react";
import './index.css'

export default function Paginated({vgPerPage, videogames, paginated}){
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(videogames/vgPerPage); i++) {
        pageNumbers.push(i)       
    }

    return(
        <div className={'pagination_cointainer'}>
                {
                    pageNumbers && pageNumbers.map(number => (
                        <button key={number} onClick={() => paginated(number)} className={'pagination'}>
                            <span>
                            {number}
                            </span>
                        </button>
                    ))
                }
        </div>
    )
}