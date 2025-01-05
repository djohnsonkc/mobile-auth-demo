
const path = './_fakeData/dashboards-composite.json';
const fakeData = require(path);
const widgetLibrary = require('./_fakeData/widget-library.json');


exports.getDashboards = function(req, res) {

	let dashboards = [...fakeData]

	dashboards.forEach(function(d){

		d.components.forEach(function(c){

			let found = widgetLibrary.find(function (widget) {
				return c.widget_library_id === widget.widget_library_id
			})
	
			if(found) {
				c.api = found.api
				c.filters = found.filters
			}

		})


	})

  res.status(200).json(dashboards)
  //res.status(401).json({ message: "Not logged in" })
}


exports.updateDashboards = function(req, res) {

	const { id } = req.query

	console.log("id", id, "method", req.method)

	//console.log("headers", req.headers)


	let jsonDB = [...fakeData]

	let found = jsonDB.find(function (item) {
		//console.log("item", item)
		return parseInt(item.dashboard_id) === parseInt(id);
	})

	if (req.method === "GET") {

		if (found) {
			res.status(200).json(found)
		}
		else {
			res.status(404).json({ message: "Not found" })
		}

	}
	else if (req.method === "PUT") {

		if (found) {

			let jsonBody = JSON.parse(req.body)
			
			jsonDB.forEach(function(item){
				if(parseInt(item.dashboard_id) === parseInt(id)) {
					// only update these properties...
					item.title = jsonBody.title
					item.order = jsonBody.order
					item.layout = jsonBody.layout
					item.components = jsonBody.components
					item.filter_selections = jsonBody.filter_selections

					// strip these out of the components array that's posted...
					item.components.forEach(function(c){
						c.api = undefined;
						c.filters = undefined;
					})

				}
			})

			fs.writeFile(path, JSON.stringify(jsonDB, null, 2), function(err){
				if(err) {
					console.log("err:", err)
					res.status(500).json(err)
				}
				else {
					console.log("success!")
					res.status(200).json({ message: "Successfully updated"}) // no need for a response body

				}
			});

		}
		else {
			res.status(404).json({ message: "Not found" })
		}

	} // end if PUT

}