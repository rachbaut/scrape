var makeDate = function() {
    var newDate = new Date();
    var formatDate = "";

    formatDate += (newDate.getMonth() + 1) + "_";
    formatDate += newDate.getDate() + "_";
    formatDate += newDate.getFullYear();

    return formatDate();
};

module.exports = makeDate;