'use client'

import Button from "@/components/atoms/ button/button"
import styles from "./reviewTable.module.css"
import deleteReview from "@/apis/review/deleteReview"
import { useRouter } from "next/navigation"
import { getConvertDate } from "@/utils/helper"

export default function ReviewTable({
    data
}){

    const router = useRouter()
    
    async function handleDelete (reviewId){
        try{
            alert(reviewId)
            const response = await deleteReview(reviewId)
            const { data: { data:{status,message} = {} } = {} } = response;
            if(status){
                alert(message)
                return
            }
        }catch(error){
            console.log(error?.response?.data?.message)
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.row}>
                <p>S No.</p>
                <p>Title</p>
                <p>Content</p>
                <p>Date</p>
                <p>Edit</p>
                <p>Delete</p>
            </div>
            {
                data.map(
                    ({title='',content='',date='',_id=''},index)=>
                    <div key={_id} className={styles.row}>
                        <p>{index +1}</p>
                        <p>{title}</p>
                        <p>{content}</p>
                        <p>{getConvertDate(date)}</p>
                        <p>
                            <Button text="edit" handleClick={()=>router.push(`/new/?id=${_id}`)}/>
                        </p>
                        <p>
                            <Button text="delete" handleClick={()=>handleDelete(_id)}/>
                        </p>
                    </div>
                )
            }
        </div>
    )
}