import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../axios"
import { Stories } from "../interface/stories"

export const fetchStories = createAsyncThunk("/stories/fetchStories", async () => {
    const { data } = await axios.get("/api/stories")
    return data
})

export const deleteStory = createAsyncThunk("/stories/deleteStory", async (id: string) => {
    const { data } = await axios.delete(`/api/stories/${id}`)
    return data
})

const initialState: Stories = {
    stories: [],
    status: "loading",
    error: null
}

const storiesSlice = createSlice({
    name: "stories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStories.pending, (state) => {
                state.stories = []
                state.status = "loading"
            })
            .addCase(fetchStories.rejected, (state) => {
                state.stories = []
                state.status = "error"
            })
            .addCase(fetchStories.fulfilled, (state, action) => {
                state.stories = action.payload
                state.status = "success"
            })
            .addCase(deleteStory.pending, (state, action) => {
                    state.stories = state.stories?.filter((story) => story._id !== action.meta.arg);
            })
    }
})

export default storiesSlice.reducer;