/* eslint-disable no-console */
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const app = express()

mongoose.connect("mongodb://localhost/muggers-db", {
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true
}) // Подключил MongoDB

app.use(bodyParser.json())
app.use("/api", require("./api"))

app.listen(4000, () => {
	console.log("server is listening")
})