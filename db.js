var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
 
var Todo = new Schema({
    content    : { type: String, required: true },
    user_id    : String,
    updated_at : Date
});
 
mongoose.model( 'Todo', Todo );
mongoose.connect( 'mongodb://localhost/express-myapp' );