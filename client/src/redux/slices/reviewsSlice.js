import { createSlice } from "@reduxjs/toolkit";

export const reviewsSlice = createSlice({
    name: "reviews",
    initialState: {
        reviews: [],
    },
    reducers: {
        getAllReviews: (state, {payload}) => {
            state.reviews = payload
        },
        deleteAReview: (state, {payload}) => {
            const reviewId = payload
            state.reviews = state.reviews.filter(r => r.id !== reviewId);
        }
    }
}) 

export const { getAllReviews, createReview, deleteAReview } = reviewsSlice.actions
export default reviewsSlice.reducer