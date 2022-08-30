
import {Request, Response} from 'express';
import Slider from '../../models/slider';
const getSliders= async(req: Request, res: Response): Promise<void>=>{
    try{
        const sliders=await Slider.find({'status':"active"}).sort({"_id":-1});
        res.status(200).send({
            status: true,
            data: sliders,
            message: "Successfully retrieved all sliders.",
          });
        } catch (error) {
          res.status(400).send({
            status: false,
            message: "Something went wrong on slider.",
          });
        }
}

export ={
    getSliders
}