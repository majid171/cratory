import { Request, Response } from "express";

export const logout = (req: Request, res: Response) => {
    req.session.destroy(() => {
        req.logout();
        res.json("logged out");
    });
};
