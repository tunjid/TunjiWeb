var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogPostSchema = new Schema({
    title: String,
    author: String,
    link: {type: String, default: '/blog/' + Date.prototype.stringDate()},
    body: String,
    tags: [String],
    categories: [String],
    comments: [{body: String, date: Date}],
    stringDate: {type: String, default: Date.prototype.getDateTimeFormat()},
    date: {type: Date, default: Date.now}
});

mongoose.model('BlogPost', BlogPostSchema);