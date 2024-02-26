export interface BestProductCate {
    success: boolean;
    message: string;
    errorCode: number;
    data: Data[];
}

export interface Data {
    category_cd: string;
    category_m_cd: null;
    category_nm: string;
    category_eng_nm: string;
    od: number;
    use_yn: string;
    best_yn: string;
    new_yn: string;
    level: number;
    file_nm1: string;
    file_nm2: string;
}

