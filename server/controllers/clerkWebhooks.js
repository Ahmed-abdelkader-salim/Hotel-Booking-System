import User from "../models/User.js";

import { Webhook } from "svix";


const clerkWebhooks = async(req, res) => {
    try {
        // create a svix instance with clerk webhook secrect
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Getting headers
        const headers = {
            "svix-id":req.headers["svix-id"],
            "svix-timestamp":req.headers["svix-timestamp"],
            "svix-signature":req.headers["svix-signature"],
        }

        // verifying Headers
        await whook.verify(JSON.stringify(req.body), headers);

        // getting the event type and data from the request body
        const {type, data} = req.body;

        // switch case for the event type
        switch(type){
            case "user.created":{
                const userData = {
                    _id:data.id,
                    email: data.email_addresses[0].email_address,
                    userName: data.first_name + " " + data.last_name,
                    image: data.image_url,
                }
                await User.create(userData);
                break;
            }
            case "user.updated":{
                const userData = {
                    _id:data.id,
                    email: data.email_addresses[0].email_address,
                    userName: data.first_name + " " + data.last_name,
                    image: data.image_url,
                }
                await User.findByIdAndUpdate(data.id, userData);
                break;
            }

            case "user.deleted":{
                await User.findByIdAndDelete(data.id);
                break;
            }
            default:
                break;
        }
        res.status(200).json({message:"Webhook received successfully"});
    } catch (error) {
        console.error("Error processing webhook:", error);
        res.status(400).json({message:"Error processing webhook"});
    }
}


export default clerkWebhooks;