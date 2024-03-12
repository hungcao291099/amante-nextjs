export interface ProductReview {
    use_review_seq: number;
    ocode: string | null;
    cust_seq: number | null;
    user_id: string;
    user_nm: string;
    product_cd: string;
    review_gb: string;
    title: string;
    content: string;
    point: number;
    file_nm1: string | null;
    file_nm2: null | string;
    file_nm3: null | string;
    file_nm4: null;
    file_nm5: null;
    hp: string | null;
    receive_zipcode: null;
    receive_addr: null;
    receive_addr2: null;
    best_yn: string;
    best_od: null;
    use_yn: string;
    od: null;
    vw_cnt: number;
    like_cnt: number;
    order_date: null;
    reg_date: string;
    reserved_yn: string;
    reserved: number | null;
    reserved_date: string | null;
    member_grp_cd: null;
    order_no: null;
    hate_cnt: null;
    photo_review_url: null | string;
    photo_review_url2: null;
    photo_review_url3: null;
    photo_review_url4: string;
    photo_review_url5: null;
    photo_review_url6: null;
    photo_review_url7: null;
    photo_review_url8: null;
    photo_review_url9: null;
    photo_review_url10: null;
    photo_review_url11: null;
    point_avg: number;
    comment_cnt: number;
    like_yn: number;
    comment: Comment[];
}

export interface Comment {
    comment_seq: number;
    use_review_seq: number;
    cust_seq: null;
    user_id: string;
    user_nm: string;
    comment: string;
    use_yn: string;
    reg_date: string;
}

