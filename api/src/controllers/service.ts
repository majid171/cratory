import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import { NativeError } from "mongoose";
import { Service, ServiceDocument } from "../models/service";
import { User, UserDocument } from "../models/user";

export const addService = async (req: Request, res: Response, next: NextFunction) => {
    await check("name", "name must not be blank").isLength({ min: 1 }).run(req);
    await check("category", "category must not be blank").isLength({ min: 1 }).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.sendStatus(400);
    }

    const serviceName = req.body.name;
    const category = req.body.category;
    const description = req.body.description;
    const priceRange = req.body.price_range;

    const user = req.user as UserDocument;
    const newService: any = new Service();

    newService.name = serviceName;
    newService.category = category;
    newService.description = description;
    newService.servicer = user._id;
    newService.price_range = priceRange;

    user.services.push(newService);

    newService.save((err: Error) => {
        if (err) {
            return res.sendStatus(500);
        }
        user.save((err) => {
            if (err) {
                return res.sendStatus(500);
            }
            return res.json(user);
        });
    });
}

export const deleteService = async (req: Request, res: Response) => {
    await check("service_id", "service_id must not be blank").isLength({ min: 1 }).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.sendStatus(400);
    }

    const serviceId = req.body.service_id;

    Service.findById(serviceId, (err: NativeError, service: ServiceDocument) => {
        if (err) {
            return res.sendStatus(500);
        }
        if (!service) {
            return res.sendStatus(404);
        }
        const user = req.user as UserDocument;

        User.findById(user._id, async (err: NativeError, user: UserDocument) => {
            if (err) {
                return res.sendStatus(500);
            }
            if (!user) {
                return res.sendStatus(404);
            }
            if (service.servicer != user._id) {
                return res.sendStatus(401);
            }

            await Service.deleteOne({ _id: service._id });
            const indexToDelete = user.services.findIndex((s) => { return s._id == service._id });
            user.services.splice(indexToDelete, 1);

            user.save(err => {
                if (err) {
                    return res.sendStatus(500);
                }

                return res.json(user);
            });
        });
    });
}