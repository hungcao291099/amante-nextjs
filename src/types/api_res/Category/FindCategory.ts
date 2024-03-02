export interface FindCategory {
    success: boolean;
    data: Data[];
}

export interface Data {
    CAT_CODE: number;
    CAT_M_CODE: number;
    CAT_NAME: string;
    lv: number;
    detail: unknown[] | Detail[];
}

export interface Detail {
    CAT_CODE: number;
    CAT_M_CODE: number;
    CAT_NAME: string;
}

