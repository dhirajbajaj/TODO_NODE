var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
 
var Todo = new Schema({
    content    : { type: String, required: true },
    user_id    : String,
    updated_at : Date
});
 
var User = new Schema({
    mobile     : { type: Number, default: 0, required: true },
    pnr        : { type: Number, default: 0, required: true },
    pnrstatus  : Object,
    updated_at : Date
});
 
mongoose.model( 'Todo', Todo );
mongoose.model( 'User', User );
mongoose.connect( 'mongodb://localhost/express-myapp' );