export interface Category_ {
    success: boolean;
    data: Data[];
}

export interface Data {
    category_cd: string;
    category_m_cd: null;
    category_nm: string;
    category_eng_nm: string;
    bigo: null;
    od: number;
    use_yn: string;
    best_yn: string;
    best_od: number;
    new_yn: string;
    new_od: number;
    level: number;
    file_nm1: string;
    file_nm2: string;
    cate_list_2: Cate_list_2[] | unknown[];
}

export interface Cate_list_2 {
    category_cd: string;
    category_m_cd: string;
    category_nm: string;
    category_eng_nm: string;
    bigo: null;
    od: number;
    use_yn: string;
    best_yn: string;
    best_od: null;
    new_yn: string;
    new_od: null;
    level: number;
    file_nm1: null;
    file_nm2: null;
    cate_list_3: Cate_list_3[] | unknown[];
}

export interface Cate_list_3 {
    category_cd: string;
    category_m_cd: string;
    category_nm: string;
    category_eng_nm: string;
    bigo: null;
    od: number;
    use_yn: string;
    best_yn: string;
    best_od: null;
    new_yn: string;
    new_od: null;
    level: number;
    file_nm1: null;
    file_nm2: null;
}

