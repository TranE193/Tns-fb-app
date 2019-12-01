import { AuthActions, AuthActionTypes } from './auth.actions';

export const authFeatureKey = 'auth';

export interface State {

}

export const initialState: State = {};

export function authReducer(state = initialState, action: AuthActions): State {
    switch(action.type) {

        case AuthActionTypes.LoadAuths:
            return state;

        case AuthActionTypes.LoadAuthsSuccess:
            return state;

        case AuthActionTypes.LoadAuthsFailure:
            return state;

        default:
            return state;
    }
}
