const mongoose = require("mongoose")

const Schema = mongoose.Schema

const MuggerShema = new Schema({
	name: String,
	age: Number,
	status: String,
	action: Boolean
})

const Mugger = mongoose.model("mugger", MuggerShema)

module.exports = Mugger