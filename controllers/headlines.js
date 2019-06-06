//bring in scrape script and makeDate scripts

var scrape = require("../scripts/scrape");

var makeDate = require("../scripts/date");

//bring in headline and note mongoose models made
var Headline = require("../models/Headline");

module.exports = {
    fetch: function(cb) {
        scrape(function(data) {
            var articles = data;
            for (var i=0; i < articles.lenght; i++) {
                articles[i].date = makeDate;
                articles[i].saved = false;
            }
            //mongo function, not mongoose
            Headline.collection.insertMany(articles, {ordered:false}, function(err, docs) {
                cb(err, docs);
            });
        });
    }, 
    delete: function(query, cb) {
        Headline.remove(query, cb);
    },
    get: function(query, cb) {
        Headline.find(query)
        .sort({
            _id: -1
        })
        .exec(function(err, doc) {
            cb(doc);
        });
    },
    update: function(query, cb) {
        Headline.update({_id: query._id}, {
            $set: query
        }, {}, cb);
    }
}