import { BaseModel } from '~/app/shared/models/base-model';

export interface Grocery extends BaseModel {
    name: string;
    amount: number;
}
