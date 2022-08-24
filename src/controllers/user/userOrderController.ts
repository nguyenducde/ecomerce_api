import {Request, Response} from 'express';
import User,{IUser} from '../../models/user'
import OrderItem from '../../models/orderitem';
import Order from '../../models/order';
import ShippingAddress from '../../models/shipping_address';
import constants from '../../config/constants';

const getMyOrder= async (req: Request, res: Response): Promise<void>=>{
    try{
        const user=req.user as IUser;
        console.log(user);
        const orders=await Order.find({user:user?.id}).sort({createdAt:-1});
        res.status(200).json({
            status:true,message:"Successfully fetched orders",data:orders
        })
    }
    catch(error){
        res.status(400).json({status:false,message:"Something went wrong. Please try again."})
    }
}
const placeOrder= async (req: Request, res: Response): Promise<Response>=>{
    try{
        const {shippingAddress,paymentMethod,note,cart}= req.body;
        
        const user=req.user as IUser;
        const user_cart=cart;
        
        // const shippingAddr=await ShippingAddress.findOne({
        //     _id:shippingAddress,
        //     user:user,
        // });
        const shippingAddr={
            user:"62ff2f3458f8c0e4b86ec414",
            country:"Nepal",
            address:"Pepsicola Kathmandu",
            phone:"98182232243",
            postalCode:"44600",
            name:"home",
        }
        
        const orderItems=[]
        
        if(user_cart && user_cart.length>0){
            for (const item of user_cart){
                const {product:{_id,name,description,price,image},quantity}=item;
                const orderItem=await OrderItem.create({name,description,price,image,product:{_id},quantity});
                orderItems.push(orderItem)
            }
        }
        else{
            res.status(409).json({
                status:false,message:"Please add item in the cart."
            })
            return;
        }
        
        
        const orderPrice=orderItems.reduce((acc,item)=>acc+Math.floor(Number(item.price))* Math.floor(Number(item.quantity)),0);
        
        const taxPrice=0;
        
        const discount=0;
        
        const shippingPrice= constants.default.shipping_price;
        
        const totalPrice=Math.floor(Number(+orderPrice + +taxPrice - +discount));
        
        const order=await Order.create({
            orderID:Math.floor(Math.random()*100000000),
            user:user?.id,
            orderItems,
            shippingAddress:{
                country:shippingAddr.country,
                address:shippingAddr.address,
                phone:shippingAddr.phone,
                postalCode:shippingAddr.postalCode,
                name:shippingAddr.name,
            },
            paymentMethod,
            discount,
            shippingPrice,
            taxPrice,
            orderPrice,
            totalPrice,
            note,
            paymentStatus:"unpaid",
            orderStatus:"pending",
        });
        
        if(order && order._id){
            await User.findByIdAndUpdate(user?.id,{
                $set:{
                    cart:[],
                },
                $addToSet:{
                    order:order._id,
                }
                
            })
            
            
            res.status(200).json({status:true,message:"Order placed successfully.",data:order})
        }
        else{
            res.status(409).json({status:false,message:"Something went wrong while creating order."})
        }
        
    }
    catch(error){
        res.status(400).json({status:false,message:error.message || "Error occurred while placing order."})
    }
}

export ={
    placeOrder,
    getMyOrder,
}