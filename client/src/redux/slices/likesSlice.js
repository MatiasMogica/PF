import { createSlice } from "@reduxjs/toolkit";

export const likesSlice = createSlice({
    name: "likes",
    initialState: {
        likes: 0,
        dislikes: 0,
        percentageOfLikes: 0,
        votesTotal: 0,
    },
    reducers: {
        AddLike: (state) => {
            state.likes++
        },
        AddDislike: (state) => {
            state.dislikes++
        },
        getTotalvotes: (state) => {
            let votes = state.likes + state.dislikes
            state.votesTotal = votes
        },
        getPercentageOfLikes: (state) => {
            let percentage = Math.trunc((state.likes * 100) / state.votesTotal)
            state.percentageOfLikes = percentage
        }
    }
}) 

export const { AddLike, AddDislike, getPercentageOfLikes, getTotalvotes } = likesSlice.actions
export default likesSlice.reducer