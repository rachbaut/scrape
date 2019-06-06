//bringing in the script function from the script directory
var scrape = require("../scripts/scrape");

//bringing in the headlines and notes from the controller directory
var headlinesController = require("../controllers/headlines");

var notesController = require("../controllers/notes")

module.exports = function(router) {
    //this route is for the homepage
    router.get("/", function(req, res) {
        res.render("home");
    });
    //this route is for handlebars page
    router.get("/saved", function(req, res) {
        res.render("saved");
    });

    router.get("/api/fetch", function(req, res) {
        headlinesController.fetch(function(err, docs) {
            if (!docs || docs.insertedCount === 0) {
                res.json({
                    message: "Sorry, there is no new articles for today. Please check back in tomorrow!"
                });
            }
            else {
                res.json({
                    message: "Your new articles " + docs.insertedCount + " are added!"
                });
            }
        });
    });
router.get("/api/headlines", function(req, res) {
    var query = {};
    if (req.query.saved) {
        query = req.query;
    }
    headlines.Controller.get(query, function(data) {
        res.json(data);
    });
});
    router.delete("/api/headlines/:id", function(req, res) {
        var query = {};
        query._id = req.params.id;
        headlinesController.delete(query, function(err, data) {
            res.json(data);
        });
    });
    router.patch("/api/headlines", function(req, res) {
        headlinesController.update(req.body, function(err, data) {
            res.json(data);
        });
    });
    router.get("/api/headlines/:id", function(req, res) {
        var query = {};
        if (req.params.headline_id) {
            query._id = req.params.headline_id;
        };
        notesController.get(query, function(err, data) {
            res.json(data);
        });
    });
    router.delete("/api/notes/:id", function(req, res) {
        var query = {};
        query._id = req.params.id;
        notesController.delete(query, function(err, data) {
            res.json(data);
        }); 
    });
    router.post("/api/notes", function(req, res) {
        notesController.save(req.body, function(data) {
            res.json(data);
        });
    });
}