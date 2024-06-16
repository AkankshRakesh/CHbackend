const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://Tim:Akanksh01@database.8ojwo32.mongodb.net/Timmern?retryWrites=true&w=majority&appName=Database'
const mongoDB = async () => { 
    try{
        mongoose.connect(mongoURI, {autoIndex : true});
        console.log('Mongo connected');
        const db = mongoose.connection;
        db.once('open', async () => {
            console.log("Connected successfully");
            try{
                const Stream = mongoose.model("Stream", new mongoose.Schema({}), "Stream");         //chatgpt'd this try block
                const fetched_data = await Stream.find({});
                const Category = mongoose.model("Category", new mongoose.Schema({}), "Category");
                const category_data = await Category.find({});
                global.category = category_data;
                
                global.stream = fetched_data;   
            // console.log(global.stream)                                
            }
            catch(error){
                console.error("Error fetching data:", error);
            }
        });  // empty curly braces for all data
    }
    catch(error){
        console.log(error)
        process.exit()
    }
}
//     await mongoose.connect(mongoURI,{ useNewUrlParser: true },(err,result)=>{
//     if(err) console.log("the damn bug :",err)
//     else{
//         console.log("Connected successfully");
//     }
// });
// }

module.exports = mongoDB;