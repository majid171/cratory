import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { NativeError } from "mongoose";
import { Job, JobDocument } from "../models/job";
import { User, UserDocument } from "../models/user";

export const createJob = async (req: Request, res: Response) => {
    await check("title", "title must not be blank").isLength({ min: 1 }).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.sendStatus(400);
    }

    const user = req.user as UserDocument;
    const job: any = new Job();

    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const skills: String[] = req.body.skills;

    job.title = title;
    job.description = description;
    job.price = price;
    job.skills = skills;
    job.issuer = user._id;

    job.save((err: NativeError) => {
        if (err) {
            return res.sendStatus(500);
        }

        return res.json(job);
    });
}

export const deleteJob = async (req: Request, res: Response) => {
    await check("_id", "_id must not be blank").isLength({ min: 1 }).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.sendStatus(400);
    }

    const jobId = req.body._id;

    Job.findById(jobId, (err: NativeError, job: JobDocument) => {
        if (err) {
            return res.sendStatus(500);
        }
        if (!job) {
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
            if (job.issuer != user._id) {
                return res.sendStatus(401);
            }

            await Job.deleteOne({ _id: job._id });
            res.sendStatus(200);
        });
    });
}

export const updateJob = async (req: Request, res: Response) => {
    await check("_id", "_id must not be blank").isLength({ min: 1 }).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.sendStatus(400);
    }

    const serviceId = req.body._id;

    Job.findById(serviceId, (err: NativeError, job: JobDocument) => {
        if (err) {
            return res.sendStatus(500);
        }
        if (!job) {
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
            if (job.issuer != user._id) {
                return res.sendStatus(401);
            }

            const updatedTitle = req.body.title;
            const updatedDescription = req.body.description;
            const updatedPrice = req.body.price;
            const updatedSkills = req.body.skills;

            job.title = updatedTitle || job.title;
            job.description = updatedDescription || job.description;
            job.price = updatedPrice || job.price;
            job.skills = updatedSkills || job.skills;

            job.save((err) => {
                if (err) {
                    return res.sendStatus(500);
                }

                res.json(job);
            });
        });
    });
}