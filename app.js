const path=require('path');
const express=require('express');
const session=require('express-session');
const app=express();
const adminRoutes=require('./routes/admin');
const authRoutes=require('./routes/auth');
const errorController = require('./controllers/error');



app.set('view engine', 'ejs');
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:false,
    resave: false 
}));
app.use(express.static(path.join(__dirname,'public')));
app.use('/public/', express.static('./public'));
app.use(adminRoutes);
app.use(authRoutes);
app.use(errorController.showError);



app.listen(3000);