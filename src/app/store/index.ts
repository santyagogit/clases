import { ActionReducerMap } from "@ngrx/store";
import { counterFeatureKey, counterReducer, CounterState } from "./counter/counter.reducer";
import { authFeatureKey, authReducer, AuthState } from "./auth/auth.reducer";

export interface RootState {
    [counterFeatureKey]: CounterState;
    [authFeatureKey]: AuthState;
}

export const rootReducer: ActionReducerMap<RootState> = {
    [counterFeatureKey]: counterReducer,
    [authFeatureKey]: authReducer
};