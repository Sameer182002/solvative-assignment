import axios from "axios";

export default async function updateReview(bodyData){
    return await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/review/`,bodyData)
}