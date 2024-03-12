export interface ReviewAllImage {
    success: boolean;
    message: string;
    errorCode: number;
    data: Data;
}

export interface Data {
    image_list1: string[];
    image_list2: string[];
}

