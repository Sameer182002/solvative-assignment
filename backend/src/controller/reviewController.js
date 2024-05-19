const { isValidObjectId } = require("mongoose")
const { broadcast } = require("../server")
const reviewService = require("../service/reviewService")

exports.createReview = async(req,res)=>{
    const {title, content} = req?.body || {}
    const activity = 'Create Review |'
    try{
        console.log(activity)
        
        if(!title?.trim() && !content?.trim()) {
            console.log(`${activity} | Title or content must be present.`)
            return res.status(400).send({
                status : false,
                message : `Title or content must be present.`
            })
        }
        const {data,status,code,message} = await reviewService.createReview(req?.body,activity)
        if(status){
            broadcast({ type: 'ADD', data });
        }
        return res.status(code || 200).send({
            status,
            ...(message && {message}),
            ...(data && {data})
        })

    }catch(error){
        console.log(`${activity} Error while creating review`,error?.message)
        return res.status(500).send({
            status : false,
            message : `Error while creating review : ${error?.message}`
        })
    }
}

exports.getAllReviews = async(req,res)=>{
    const activity = 'Get All Reviews |'
    const {reviewId=''} = req?.query || {}
    try{
        if(reviewId && !isValidObjectId(reviewId)){
            console.log(`${activity} | Review id must be present and should be valid for get review`,{reviewId})
            return res.status(400).send({status:false,message:`Review id must be present and should be valid for get review`})
        }
        const {data=[],status,code,message} = await reviewService.getAllReviews(reviewId,activity)
        return res.status(code || 200).send({
            status,data,message
        })
    }catch(error){
        console.log(`${activity} | Error while fetching all the reviews`,error?.message)
        return res.status(500).send({
            status : false,
            message : `Error while fetching all the reviews : ${error?.message}`
        })
    }
}


exports.updateReview = async(req,res) =>{
    const {title, content, reviewId} = req?.body || {}
    const activity = `Update Review | `
    try{
        if(!reviewId || !isValidObjectId(reviewId)){
            console.log(`${activity} | Review id must be present and should be valid for updating review`,{reviewId})
            return res.status(400).send({status:false,message:`Review id must be present and should be valid for updating review`})
        }
        console.log('updating')
        const {status, code, data, message} = await reviewService.updateReview(req?.body,activity)
        if(status){
            broadcast({ type: 'UPDATE', review : data });
        }
        return res.status(code || 200).send({
            status,
            ...(message && {message}),
            ...(data && {data})
        })
    }catch(error){
        console.log(`${activity} Error while updating the review `, error?.message)
        return res.status(500).send({
            status : false,
            message : `Error while updating the review : ${error?.message}`
        })
    }
}

exports.deleteReview = async (req,res)=>{
    const {reviewId=''} = req?.query || {}
    const activity = `Delete Review | `
    try{
        if(!reviewId || !isValidObjectId(reviewId)){
            console.log(`${activity} | Review id must be present and should be valid for updating review`,{reviewId})
            return res.status(400).send({status:false,message:`Review id must be present and should be valid for updating review`})
        }
        const {status, code, data, message} = await reviewService.deleteReview(req?.query,activity)
        if(status){
            broadcast({ type: 'DELETE', id: req.body.reviewId });
        }
        return res.status(code || 200).send({
            status,
            ...(message && {message}),
            ...(data && {data})
        })
    }catch(error){
        console.log(`${activity} Error while deleting the review `, error?.message)
        return res.status(500).send({
            status : false,
            message : `Error while deleting the review : ${error?.message}`
        })
    }
}