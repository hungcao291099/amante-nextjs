export interface HouseWarming {
	success: boolean;
	message: string;
	errorCode: number;
	data: Data[];
	page: number;
	total: number;
	pageCnt: number;
	totalPage: number;
}

export interface Data {
	event_seq: number;
	event_nm: string;
	event_con: null;
	site_gb: null;
	event_type: null;
	event_state: null;
	s_date: null;
	e_date: null;
	tester_recomm_date: null;
	tester_recomm_cnt: null;
	content: string;
	link_url: null;
	use_yn: string;
	del_yn: string;
	od: number;
	file_nm1: string;
	sort: string;
	content_mobile: null;
	reg_date: string;
	hit: number;
	writer_id: string;
	writer: string;
	tel: string;
	email: string;
	like: number;
	event_gb?: string | null;
	file_nm2: null;
	file_nm3: null;
	file_nm4: null;
	main_yn: string;
	relationList: string[];
}

