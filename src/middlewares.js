import multer from "multer";

export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    // req.session 은 session DB 에 저장된 session. 이를 res.locals 에 저장해 pug 로 전달할 수 있게 함.
    res.locals.siteName = "Metube";
    res.locals.loggedInUser = req.session.user || {};
    next();
}

export const protectorMiddleware = (req, res, next) => {
    if (req.session.loggedIn) {
        next();
    } else {
        return res.redirect("/login");
    }
}

export const publicOnlyMiddleware = (req, res, next) => {
    if (!req.session.loggedIn) {
        next();
    } else {
        return res.redirect("/");
    }
}

// multer 사용 위한 middleware configuration.
// dest: "uploads/" => 사용자가 보낸 파일을 uploads 폴더에 저장.
export const uploadFiles = multer({
    dest: "uploads/"
});