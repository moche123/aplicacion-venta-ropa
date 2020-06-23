const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://mochemiguel123:<password>@cluster-dgmgg.azure.mongodb.net/test',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(db=>console.log('DB is connected'))
.catch(err => console.error(err));
