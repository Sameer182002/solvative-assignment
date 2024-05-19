'use client'
import { useEffect, useState } from "react"
import styles from "./page.module.css"
import Button from "@/components/atoms/ button/button"
import { useRouter , useSearchParams} from "next/navigation"
import getAllReviews from "@/apis/review/getAllReview"
import updateReview from "@/apis/review/updateeview"
import createReview from "@/apis/review/createReview"
export default function NewAdditonPage(){
    const router = useRouter()
    const [inputdata, setInputData] = useState({
        title : '',
        content : ""
    })
    const [isUpdating, setIsUpdating] = useState(false)
    const [updatingReviewId,setIsUpdatingReviewId] = useState('')

    const search = useSearchParams()
    const reviewId = search.get('id')
    
    useEffect(()=>{
        if(!reviewId) return
        getReviewByReviewID()
    },[])
    async function getReviewByReviewID(){
        try{
            const response = await getAllReviews(reviewId)
            const { data: { data : {title='',content='',_id}={} } = {} } = response || {};
            setInputData({
                title,
                content
            })
            setIsUpdating(true)
            setIsUpdatingReviewId(_id)
        }catch(error){
            console.log(error?.response?.data?.message);
        }
    }


    async function handleUpdate(){
        try{
            const {title,content} = inputdata || {}
            if(!title || !content){
                alert("Fill the fields")
                return
            }
            const response = await updateReview({
                title,content,reviewId : updatingReviewId
            })
            const { data: { data ={},status=false,message } = {} } = response || {};
            if(status){
                alert(message)
                router.push("/")
            }
        }catch(error){
            console.log(error?.response?.data?.message);
        }
    }

    async function handleAdditon(){
        try{
            const {title,content} = inputdata || {}
            if(!title || !content){
                alert("Fill the fields")
                return
            }
            const response = await createReview({
                title,content
            })
            const { data: { data ={},status=false,message } = {} } = response || {};
            if(status){
                alert(message)
                router.push("/")
            }
        }catch(error){
            console.log(error?.response?.data?.message);
        }
    }

    return (
        <div className={`mainWrapper ${styles.wrapper}`}>
            <h1>{isUpdating ? "Update Review" :"Add New Review"}</h1>
            <input
                placeholder="Enter title"
                value={inputdata?.title}
                className={styles.input}
                onChange={(e)=>setInputData({
                    ...inputdata,
                    title : e.target.value
                })}
            />
            <textarea
                placeholder="Enter content"
                value={inputdata?.content}
                className={styles.textarea}
                onChange={(e)=>setInputData({
                    ...inputdata,
                    content : e.target.value
                })}
            />
            <div className={styles.ButtonWrapper}>
                <Button text="Cancel" handleClick={()=>{
                    setInputData({
                        title : '',
                        content : ""
                    })
                    router.push("/")
                }}/>
                <Button text="Save" handleClick={()=>{
                    isUpdating ? handleUpdate() : handleAdditon()
                }}/>
                <Button text="Reset" handleClick={()=>{
                    setInputData({
                        title : '',
                        content : ""
                    })
                }}
                />
            </div>
        </div>
    )
}