import express from 'express';
import { merge, get } from 'lodash';
import { getUserBySession } from 'models/users';


export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const sessionToken = req.cookies['VAII-AUTH'];

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const existingUser = await getUserBySession(sessionToken);

    if (!existingUser) {
      return res.sendStatus(403);
    }

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { id } = req.params
    const curUserId = get(req, 'identity._id') as string

    if (!curUserId) {
      return res.sendStatus(400)
    }

    if(curUserId.toString() !== id) {
      return res.sendStatus(403)
    }

    next()
  } catch(error) {
    console.log(error);
    return res.sendStatus(400);
  }
}