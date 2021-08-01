import { NextFunction, Request, Response, Router } from 'express';
import logger from '../logger';

const route = Router();

export default (app: Router) => {
    app.use('/auth', route);

    route.post(
        '/',
        //Do req header and body validation using Celebrate + Joi,
        async (req: Request, res: Response, next: NextFunction) => {
            try {
            // EXAMPLE OF POSSIBLE AUTH

            // const authServiceInstance = Container.get(AuthService);
            // const { user, token } = await authServiceInstance.Authenticate(req.body as User);
            // return res.json({ user, token }).status(201);
            } catch (e) {
                logger.error(' error ', e);
                return next(e);
            }
        },
    );
};