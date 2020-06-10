//roles.js

const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function(){

    ac.grant("searcher")
    .readOwn("profile")
    .updateOwn("profile")

    ac.grant("moderator")
    .extend("searcher")

    ac.grant("submitter")
    .extend("searcher")

    ac.grant("analyst")
    .extend("searcher")

    ac.grant("administrator")
    .extend("searcher")
    .readAny("profile")
    .updateAny("profile")
    .deleteAny("profile")

    return ac;
})();