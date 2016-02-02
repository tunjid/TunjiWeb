var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogPostSchema = new Schema({
    title: {type: String, required: true},
    author: {type: Schema.ObjectId, ref: 'User', required: 'Author is required',},
    link: {type: String, default: '/blog/' + Date.prototype.stringDate()},
    body: String,
    tags: {type:[String], index: true, default:['untagged']},
    categories: {type:[String], index: true, default:['uncategorized']},
    comments: [{body: String, date: Date}],
    stringDate: {type: String, default: Date.prototype.getDateTimeFormat()},
    created: {type: Date, default: Date.now}
});

mongoose.model('BlogPost', BlogPostSchema);