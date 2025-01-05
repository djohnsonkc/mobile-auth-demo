

exports.fakeData = function (req, res) {

	console.log("fakeEndpoint...")

	if (req.query.forced && req.query.forced === "401") {
		return res.status(401).json({ message: "Not logged in" })
	}

	return res.status(200).json({ message: "GET successful" })

}

