import { createSlice } from "@reduxjs/toolkit";


export const videogamesSlice = createSlice({
    name: "videogames",
    initialState: {
        videogames: [],
        details: {}
    },
    reducers: {
        getAllVideogames: (state, action) => {
            state.videogames = action.payload
        },
        getVideogameById: (state, action) => {
            state.details = action.payload
        }
    }
})

export const {getAllVideogames, getVideogameById} = videogamesSlice.actions
export default videogamesSlice.reducer