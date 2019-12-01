import { RootAction, RootActionTypes } from './root.actions';
import { User } from "nativescript-plugin-firebase";

export const rootFeatureKey = 'root';

export interface RootState {
    currentUser: User;
    loaded: boolean;
}

export const initialState: RootState = {
    currentUser: null,
    loaded: false
};

export interface RootPartialState {
    readonly [rootFeatureKey]: RootState;
}

export function rootReducer(state: RootState = initialState, action: RootAction): RootState {
    switch(action.type) {

        case RootActionTypes.LoadCurrentUser:
            state = {
                ...state,
                loaded: false
            };
            break;

        case RootActionTypes.LoadCurrentUserSuccess:
            state = {
                ...state,
                currentUser: action.payload,
                loaded: true
            };
            break;

        case RootActionTypes.LoadCurrentUserFailure:
            state = {
                ...state,
                loaded: true
            };
            break;

        case RootActionTypes.LoginSuccess:
            state = {
                ...state,
                currentUser: action.payload
            };
            break;

        case RootActionTypes.LogoutSuccess:
            state = {
                ...state,
                currentUser: null
            };
            break;
    }
    return state;
}
