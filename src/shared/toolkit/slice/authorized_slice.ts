import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export type AuthorizedState = {
	Status: boolean;
};
const initialState = {
	Status: false,
} as AuthorizedState;

export const authorized = createSlice({
	name: "authorized",
	initialState,
	reducers: {
		reset: () => initialState,
		changeAuthorized: (
			state: AuthorizedState,
			action: PayloadAction<AuthorizedState>,
		) => {
			const { Status } = action.payload;
			state.Status = Status !== undefined ? Status : state.Status;
		},
	},
});
export const { changeAuthorized, reset } = authorized.actions;
export default authorized.reducer;