export interface TotalProp {
    status: string;
    response: Response[];
}

export interface Response {
    H_CODE: string;
    H_NAME: string;
    DETAILED: DETAILED[] | unknown[];
}

export interface DETAILED {
    H_CODE: string;
    D_CODE: string;
    D_NAME: string;
}

