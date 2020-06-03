const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true, minLength: 6 },
    role: { type: String, default: 'searcher', enum:["moderator", "administrator", "analyst", "submitter", "searcher"]},
    accessToken:{ type: String }
}, 
{
    timestamps: true,
});

const DBUser = mongoose.model('DBUser', DBUserSchema);

module.exports = DBuser;