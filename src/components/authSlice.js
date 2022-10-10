import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    isLoginPending: false,
    isLoginSuccess: false,
    errorMassage: null,
    user: {
        email: null,
    },
};

function callLoginApi(email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === 'admin@login.com' && password === 'admin') {
                resolve({ email });
            } else {
                reject(new Error('Invalid email or password'));
            }
        }, 1000);
    });
}

export const authLoginAPI = createAsyncThunk(
    'auth/login',
    async ({ email, password }) => {
        try {
            const response = await callLoginApi(email, password);
            return response.email;
        } catch (error) {
            throw error;
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(authLoginAPI.pending, (state) => {
            state.isLoginPending = true;
            state.isLoginSuccess = false;
            state.errorMassage = null;
        })
            .addCase(authLoginAPI.fulfilled, (state, action) => {
                state.isLoginPending = false;
                state.isLoginSuccess = true;
                state.user = { email: action.payload };
            })
            .addCase(authLoginAPI.rejected, (state, action) => {
                console.log(action, "rejected");
                state.isLoginPending = false;
                state.isLoginSuccess = false;
                state.errorMassage = action.error.message;
            });
    }
});

export default authSlice.reducer;