import {configureStore} from  '@reduxjs/toolkit'
import videogames from "../slices/videogamesSlice"

export default configureStore({
    reducer: {
        videogames: videogames
    }
})