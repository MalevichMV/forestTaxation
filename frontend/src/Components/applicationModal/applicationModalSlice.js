import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    openModal: false,
    cost: '',
    costCorrect: true,
    dateOfEnd: '',
    dateOfEndCorrect: true,
    consent: false,
    alertAboutProblem: '',
    activeDropdown: false,
    dropDownItem: "",
    coordinates: []
}

const applicationModalSlice = createSlice({
    name: 'applicationModal',
    initialState,
    reducers: {
        setOpenModal: (state, action) => {
            state.openModal = action.payload;
        },
        setCost: (state, action) => {
            state.cost = action.payload;
        },
        setDateOfEnd: (state, action) => {
            state.dateOfEnd = action.payload;
        },   
        setCostCorrect: (state, action) => {
            state.costCorrect = action.payload;
        },
        setDateOfEndCorrect: (state, action) => {
            state.dateOfEndCorrect = action.payload;
        },
        addCoordinate: (state, action) => {
            state.coordinates.push(action.payload);
        },
        toogleActiveDropDown: (state) => {
            state.activeDropdown = !state.activeDropdown;
        },
        setDropDownItem: (state, action) => {
            state.dropDownItem = action.payload;
        },
        removeCoordinate: (state) => {
            state.coordinates.pop();
        },
        resetCoordinates: (state) => {
            state.coordinates = [];
        },
        toggleConsent: (state) => {
            state.consent = !state.consent;
        },
        changeAlertAboutProblem:(state, action) => {
            state.alertAboutProblem = action.payload;
        },
        resetState: () => {
            return initialState;
        }
    }
});

const {actions, reducer} = applicationModalSlice;

export default reducer;
export const {
    setOpenModal,
    setCost,
    setDateOfEnd,
    resetState,
    setCostCorrect,
    setDateOfEndCorrect,
    addCoordinate,
    toogleActiveDropDown,
    setDropDownItem,
    removeCoordinate,
    resetCoordinates,
    toggleConsent,
    changeAlertAboutProblem
} = actions;