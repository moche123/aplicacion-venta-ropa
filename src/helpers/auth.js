const helpers = {};

helpers.isAuthenticated = (req,res,next)=>{
    const errors = [];
    if(req.isAuthenticated()){
        return next();    
    }
    else{
        req.flash('error_msg','Not Autorized');
        console.log('No estas logueado');
        res.redirect('/users/signin');
    }
};

module.exports = helpers;