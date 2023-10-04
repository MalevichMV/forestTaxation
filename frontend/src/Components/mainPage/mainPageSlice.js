import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    stateOfPacts: 'active',
    items: [],
    process: '',
    activeChat: null,
    activeMap: null
}

const mainPageSlice = createSlice({
    name: 'mainPage',
    initialState,
    reducers: {
        activePacts: (state) => {state.stateOfPacts = 'active';},
        currentPacts: (state) => {state.stateOfPacts = 'current';},
        completedPacts: (state) => {state.stateOfPacts = 'completed';},
        setItems: (state, action) => {
            state.items = action.payload;
        },
        setProcess: (state, action) => {
            state.process = action.payload;
        },
        setActiveChat: (state, action) => {
            state.activeChat = action.payload;
        },
        setActiveMap: (state, action) => {
            state.activeMap = action.payload;
        },
    }
});

const {actions, reducer} = mainPageSlice;

export default reducer;
export const {
    activePacts,
    currentPacts,
    completedPacts,
    setItems,
    setProcess,
    setActiveChat,
    setActiveMap
} = actions;