export interface Category {
    success: boolean;
    data: Data[];
}

export interface Data {
    CAT_CODE: number;
    CAT_M_CODE: number;
    CAT_NAME: string;
    lv: number;
    CODE: string;
    SORT_SEQ: string;
    cate_list_2: Cate_list_2[];
    file_nm: File_nm[] | [];
}

export interface Cate_list_2 {
    CAT_CODE: number;
    CAT_M_CODE: number;
    CAT_NAME: string;
    lv: number;
    CODE: string;
    SORT_SEQ: string;
    cate_list_3: Cate_list_3[];
    file_nm: File_nm[] | [];
}

export interface File_nm {
    CAT_CODE: number;
    file_nm: string;
}

export interface Cate_list_3 {
    CAT_CODE: number;
    CAT_M_CODE: number;
    CAT_NAME: string;
    lv: number;
    CODE: string;
    SORT_SEQ: string;
    file_nm: File_nm[] | [];
}

