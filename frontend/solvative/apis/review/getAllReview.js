import axios from "axios";

export default async function getAllReviews(reviewId){
    let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/review/`
    if(reviewId){
        url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/review/?reviewId=${reviewId}`
    }
    return await axios.get(url)
}