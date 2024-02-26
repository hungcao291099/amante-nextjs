export interface Banner1 {
    success: boolean;
    message: string;
    errorCode: number;
    data: Data[];
}

export interface Data {
    banner_type: string;
    banner_seq: number;
    banner_nm: string;
    en_banner_nm: string;
    banner_cd: string;
    display_Sdate: string;
    display_Edate: string;
    od: number;
    link: string;
    link_gb: string;
    left_size: null;
    top_size: null;
    width_size: null;
    file_nm1: string;
    file_nm2: string;
    m_file_nm1: null;
    content: string;
    content_mobile: string;
    content_text1: string;
    text1_rgb: string;
    content_text2: string;
    text2_rgb: string;
    content_text3: string;
    text3_rgb: string;
    en_content_text1: string;
    en_content_text2: string;
    en_content_text3: string;
    category1_cd: string;
    category2_cd: string;
    category3_cd: string;
    product_cd: string;
    use_yn: string;
    reg_date: string;
    web_use_yn: string | null;
    and_use_yn: null | string;
    ios_use_yn: null | string;
}

