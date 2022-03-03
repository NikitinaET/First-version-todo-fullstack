const mongoose = require('mongoose');
module.exports = async () => {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            //useCreateIndex: true,
            useUnifiedTopology: true,
        }
        await mongoose.connect(
            'mongodb+srv://some_user:abcd1234@cluster0.iendk.mongodb.net/todo_app?retryWrites=true&w=majority',
            connectionParams
            );
        console.log('Connected to database.');
    }

    catch (e){
        console.log("Could not connect to database.", e);
    }
};
