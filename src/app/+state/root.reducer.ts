import { RootActions, RootActionTypes } from './root.actions';

export const rootFeatureKey = 'root';

export interface State {

}

export const initialState: State = {};

export function rootReducer(state = initialState, action: RootActions): State {
    switch(action.type) {

        case RootActionTypes.LoadRoots:
            return state;

        case RootActionTypes.LoadRootsSuccess:
            return state;

        case RootActionTypes.LoadRootsFailure:
            return state;

        default:
            return state;
    }
}
