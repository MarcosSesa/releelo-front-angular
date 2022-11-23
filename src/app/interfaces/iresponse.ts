import { Ibook } from './ibook';
export interface Iresponse {
    error:      null;
    data:       Ibook[];
    count:      null;
    status:     number;
    statusText: string;
}


