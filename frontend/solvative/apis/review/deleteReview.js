import axios from "axios";

export default async function deleteReview(reviewId){
    return await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/review/?reviewId=${reviewId}`,)
}