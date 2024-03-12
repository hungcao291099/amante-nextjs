export interface ProductQna {
    total_count: number;
    total_page: number;
    current_page: number;
    row_per_page: number;
    data: Data[];
}

export interface Data {
    no: number;
    sort: string;
    main: string;
    show: string;
    notice: string;
    reply: string;
    code_gb: number;
    gender: string;
    age: null;
    cust_seq: number;
    writer_id: string;
    writer: string;
    writer_phone: string;
    writer_email: string;
    password: null | string;
    link: null;
    title: string;
    content: string;
    reply_content: string;
    reply_date: string;
    hit: number;
    reg_date: string;
    mod_date: null;
    del_date: null;
    file_nm1: null;
    file_nm2: null;
    file_nm3: null;
    file_nm4: null;
    file_nm5: null;
    file_real_nm1: null;
    file_real_nm2: null;
    file_real_nm3: null;
    file_real_nm4: null;
    file_real_nm5: null;
    ip: null;
    del: string;
    notice_od: null;
    od: null;
    product_cd: string;
    public_yn: string;
    bigo2: null;
    ocode: string;
    code_nm2: string;
}

