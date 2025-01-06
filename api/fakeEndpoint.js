const jwtDecode = require("jwt-decode");

exports.fakeData = function (req, res) {
	console.log("req headers", req.headers.authorization)
    const authHeader = req.headers['authorization']; // Retrieve the Authorization header

    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header is missing' });
    }

    // Extract the token by removing the 'Bearer ' prefix
    const token = authHeader.split(' ')[1];

	console.log("access_token", token)

    if (!token) {
        return res.status(401).json({ error: 'Invalid Authorization header format' });
    }

    try {
        // Decode the token
        const decoded = jwtDecode(token);

        console.log("decoded", decoded);

        return res.status(200).json({
            message: "GET successful",
            token: decoded,
        });
    } catch (error) {
        console.error("Error decoding token:", error);
        return res.status(400).json({ error: 'Invalid or malformed token', token: decoded });
    }
};

