// const checkUserRole = ((req, res, next) => {
//     const userrole = req.headers['user-role'];
//     console.log(userrole);
//     next()
//     }
// )

const checkUserRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.headers['user-role']) return res.sendStatus(401);
        const roleChecker = [...allowedRoles];
        const role = req.headers['user-role'];
        const result = roleChecker.includes(role);
        
        if (!result) {
            res.status(401);
            return res.send('Not allowed')
        }

        next()
    }
}

module.exports = checkUserRole