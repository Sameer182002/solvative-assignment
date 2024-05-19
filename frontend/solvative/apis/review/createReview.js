import axios from "axios";

export default async function createReview(bodyData){
    return await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/review/`, bodyData)
}