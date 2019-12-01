import { createFeatureSelector } from '@ngrx/store';
import * as fromRoot from './root.reducer';

export const selectRootState = createFeatureSelector<fromRoot.State>(
    fromRoot.rootFeatureKey
);
