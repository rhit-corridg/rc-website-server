import {AuthenticationError} from 'apollo-server-express'

export const authenticateResolver = (perms, next) => (root, args, context, info) => {
    if (!context.user) {
        throw new AuthenticationError(`Error: Unable to authenticate request!`);
    }

    if (perms) {
        if (perms.tt) {
            if (!perms.tt.includes(context.user.ttpermission)) throw new AuthenticationError(`Error: Unable to authenticate request!`)
        }

        if (perms.app) {
            if (!perms.app.includes(context.user.permission)) throw new AuthenticationError(`Error: Unable to authenticate request!`)
        }
    }

    return next(root, args, context, info);
};

export const authenticateRoute = (perms, req, next) => {
    if (!req.user) {
        return res.status(401).send({
            error: "Unauthorized"
        })
    }

    if (perms) {
        if (perms.tt) {
            if (!perms.tt.includes(req.user.ttpermission)) {
                return res.status(401).send({
                    error: "Unauthorized"
                })
            }
        }

        if (perms.app) {
            if (!perms.app.includes(req.user.permission)) {
                return res.status(401).send({
                    error: "Unauthorized"
                })
            }
        }
    }

    return next();
}