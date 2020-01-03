const auth = require('basic-auth');

const checkAuth = req => {
    var user = auth(req);
    if (user && user.name === process.env.USERNAME && user.pass === process.env.PASSWORD) {
        return user.name;
    }
    return null;
};

const provideAuthentication = (req, res) => {
    if (!req) {
        return { shouldDisallowAccess: false };
    }

    let shouldDisallowAccess = false;
    let username;

    if (process.env.NOW_REGION) {
        shouldDisallowAccess = true;
        username = checkAuth(req);
        if (username) {
            shouldDisallowAccess = false;
        }
    }

    if (shouldDisallowAccess) {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="Apero web"');
        res.end(`Not allowed`);
        return;
    }
    return { shouldDisallowAccess, username };
};

export default provideAuthentication;
