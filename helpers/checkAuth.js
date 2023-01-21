module.exports = async (req, res, next) => {
    if(!req.session.user){
        req.session.backURL = req.url;
        res.redirect("/login");
	}
	return next();
};