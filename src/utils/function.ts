import { UseReview } from "@/types/api_res/ProductDetail/ProductDetail";

export const formatNumber = (number: number) => {
    var formatter = new Intl.NumberFormat("en-US", {
        // These options are needed to round to whole numbers if that's what you want.
        minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    return formatter.format(number);
};
export const getReviewImageList = (useReview: UseReview[]) => {
    var imageList: string[] = []
    useReview.map(review => {
        if (review.file_nm1 != null || review.file_nm1 != "") imageList.push(`https://www.amante.co.kr/uploads/review/${review.file_nm1}`)
        if (review.file_nm2 != null || review.file_nm2 != "") imageList.push(`https://www.amante.co.kr/uploads/review/${review.file_nm2}`)
        if (review.file_nm3 != null || review.file_nm3 != "") imageList.push(`https://www.amante.co.kr/uploads/review/${review.file_nm3}`)
        if (review.file_nm4 != null || review.file_nm4 != "") imageList.push(`https://www.amante.co.kr/uploads/review/${review.file_nm4}`)
        if (review.file_nm5 != null || review.file_nm5 != "") imageList.push(`https://www.amante.co.kr/uploads/review/${review.file_nm5}`)

        if (review.photo_review_url != null || review.photo_review_url != "") imageList.push(`${review.photo_review_url?.replace("//cdn", "cdn")}`)
        if (review.photo_review_url2 != null || review.photo_review_url2 != "") imageList.push(`${review.photo_review_url2?.replace("//cdn", "cdn")}`)
        if (review.photo_review_url3 != null || review.photo_review_url3 != "") imageList.push(`${review.photo_review_url3?.replace("//cdn", "cdn")}`)
        if (review.photo_review_url4 != null || review.photo_review_url4 != "") imageList.push(`${review.photo_review_url4?.replace("//cdn", "cdn")}`)
        if (review.photo_review_url5 != null || review.photo_review_url5 != "") imageList.push(`${review.photo_review_url5?.replace("//cdn", "cdn")}`)
        if (review.photo_review_url6 != null || review.photo_review_url5 != "") imageList.push(`${review.photo_review_url5?.replace("//cdn", "cdn")}`)
    })
    return imageList
}