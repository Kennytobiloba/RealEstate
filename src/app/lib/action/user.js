import User from "../models/users.model";
import { connect } from "../mongodb/mongoose";
 
export const createOrUpdateUser = async (
    id,
    first_name,
    last_name,
    email_addresses,
    image_url,
)=> {
    try {
        await connect()
        const user = await User.findOneAndUpdate({clerkId: id}, 
           {
            $set:{
                firstName:first_name,
                lastName:last_name,
                email:email_addresses[0].email_address,
                profilePictuure:image_url
            }
           }, {upsert:true, new:true})
           return user     
    } catch (error) {
        console.error(error)
        throw new Error('Error creating or updating user')        
    }
}
 export const delectUser = async (id) => {
    try {
        await connect()
        await connect()
        await User.deleteOne({clerkId: id})
        return true
    } catch (error) {
        console.error(error)
        throw new Error('Error deleting user')
    }
 }
 