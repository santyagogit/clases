import { createFeatureSelector, createSelector } from "@ngrx/store";
import { authFeatureKey, AuthState } from "./auth.reducer";


export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectAuthUserEmail = createSelector(
    selectAuthState,
    (state) => state.authUser?.email
);

export const selectAuthUser = createSelector(selectAuthState, (state) => state.authUser);
