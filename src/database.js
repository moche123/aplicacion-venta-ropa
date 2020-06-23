const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://moche123:unprg624@cluster-dgmgg.azure.mongodb.net/dbTodo?retryWrites=true&w=majority',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(db=>console.log('DB is connected'))
.catch(err => console.error(err));
