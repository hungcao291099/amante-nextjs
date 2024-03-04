export interface PRODUCT_CODE_API_GET {
    success: boolean;
    data: Data;
}

export interface Data {
    PD_info: PD_info[];
    Navi: Navi[];
}

export interface PD_info {
    CAT_CODE: number;
    lv: number;
    PRODUCT_CODE: string;
    product_cd: string;
}

export interface Navi {
    CAT_CODE: number;
    CAT_M_CODE: number;
    CAT_NAME: string;
    lv: number;
    detail: Detail[] | unknown[];
}

export interface Detail {
    CAT_CODE: number;
    CAT_M_CODE: number;
    CAT_NAME: string;
}

