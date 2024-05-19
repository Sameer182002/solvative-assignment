const reviewModel = require("../models/reviewModel")

exports.createReview = async(bodyData, activity)=>{

    const {title, content} = bodyData || {}

    const review = await reviewModel.create({
        title,
        content,
        date : Date.now()
    })
    console.log(`${activity} Review Created`,{review})

    return {status:true, code: 201, message : 'Review Added', data : review}
}

exports.getAllReviews = async(reviewId,activity)=>{
    if(reviewId){
        const reviewData = await reviewModel.findOne({
            isDeleted : false,
            _id: reviewId
        })
        if(!reviewData){
            console.log(`${activity} Review not found`,{reviewId})
            return {status : false, code : 404, message : 'Review Not Found' }
        }
        return {status: true, code:200, data : reviewData}
    }

    const reviews = await reviewModel.find({
        isDeleted : false
    }).sort({date : -1})

    return {status: true, code:200, data : reviews}
}

exports.updateReview = async(bodyData, activity)=>{
    const {title, content, reviewId} = bodyData || {}
    const review = await reviewModel.findOneAndUpdate({
        isDeleted : false,
        _id :  reviewId
    },{
        $set : {
            title,
            content
        }
    },{new: true})

    if(!review){
        console.log(`${activity} Review not found`,{reviewId})
        return {status : false, code : 404, message : 'Review Not Found' }
    }

    return {status : true, code: 200, data : review,message : 'Review Updated Successfully.'}
}

exports.deleteReview = async(queryData, activity)=>{
    const {reviewId} = queryData || {}
    const review = await reviewModel.findOneAndUpdate({
        isDeleted : false,
        _id :  reviewId
    },{
        $set : {
            isDeleted : true
        }
    },{new: true})

    if(!review){
        console.log(`${activity} Review not found`,{reviewId})
        return {status : false, code : 404, message : 'Review Not Found' }
    }

    return {status : true, code: 200, data : review,message : 'Review Deleted Successfully.'}
}