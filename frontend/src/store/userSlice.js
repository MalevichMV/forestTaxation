import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    user: '',
    id: -1,
    activity: '',
    loading: true
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsAuth: state => { state.isAuth = true },
        setIsNotAuth: state => { state.isAuth = false },
        setUser: (state, action) => { state.user = action.payload },
        setId: (state, action) => { state.id = action.payload },
        setActivity: (state, action) => { state.activity = action.payload },
        setLoading: (state, action) => { state.loading = action.payload },
        resetState: () => {
            return initialState;
        }
    }
});

const {actions, reducer} = userSlice;

export default reducer;
export const {
    setIsAuth,
    setIsNotAuth,
    setUser,
    setId,
    setActivity,
    setLoading,
    resetState
} = actions;