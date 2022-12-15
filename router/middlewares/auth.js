const checkAuthenticated =(req,res,next)=>{
    if(req.isAuthenticated())
    {
        res.set('Cache-control','no-cache,private,no-store,must-revalidate,post-check=0,pre-check=0');
        return next();
    }
    else{
        res.redirect('/login');
    }
}

const isAdmin = (req,res,next)=>{
    if(req.isAuthenticated())
    {
        res.set('Cache-control','no-cache,private,no-store,must-revalidate,post-check=0,pre-check=0');
        if(req.user.userType != 'admin'){
            res.redirect('/login')
        }
        else
        return next();
    }
    else{
        res.redirect('/login');
    }
}

const loginCheck = (req,res,next)=>{
    if(req.isAuthenticated())
    {
        if(req.user.userType=="admin")
        res.redirect('/admin')
        else
        res.redirect('/home')
    }
    else{
        return next()
    }
}

const isVerified = (req,res,next)=>{
    if(req.user.isVerified)
    next()
    else
    res.redirect('/verify')
}



module.exports = {checkAuthenticated,loginCheck,isVerified, isAdmin}