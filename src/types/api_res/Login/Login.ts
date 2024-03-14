export interface Login {
    success: boolean;
    message: string;
    errorCode: number;
    data: Data;
}

export interface Data {
    cust_seq: number;
    user_id: string;
    user_nm: string;
    email: string;
    phone: string;
    pass_change_date: null;
    member_grp_cd: number;
    token: string;
    refresh_token: string;
}

