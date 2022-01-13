'use strinct';
const connection = require('../config/connection')

const { aplication, logs, auth } = require('../database/schemas')
const { ApplicationValid, ApplicationValidDb, LogValidJoi } = require('./joi')


// connection().then(connections => {
// 	var x = new aplication({ name: "edy" })
// 	var y = new logs({
// 		application_id: "1234",
// 		type: 'error',
// 		priority: 'low',
// 		path: './oatg',
// 		message: "mensage",
// 		request: "new",
// 		response: "{ data: Mixed }",
// 		createAt: new Date()
// 	});
// 	var z = new auth({
// 		application_id: '123',
// 		token: "yuhjhvg "
// 	})
// 	z.save()
// var validateApp = ApplicationValid({ username: 'hjj' })
// 		if (validateApp.error) {
// 			res.json({ message: 'error' });
// 		} else {
// 			res.json({ message: 'Example request.' });
// 		}
// })


class MainController {


	all(req, res, next) {
		connection().then(conn => {
			conn.models.logs.find({}, (err, data) => {
				if (err) {
					res.json({ message: err })

				} else {
					res.json({ message: data })
				}
			})

		})
	}

	create(req, res, next) {
		var validateApp = ApplicationValid({ name: req.body.name, token: req.headers.authorization })
		var logValidJoi = LogValidJoi(req.body.log)
		if (validateApp.error) {
			res.json({ messgae: validateApp.error.details })
		} else {
			if (logValidJoi.error) {
				res.json({ messgae: logValidJoi.error.details })
			} else {
				ApplicationValidDb({ name: req.body.name, token: req.headers.authorization, serverEnd: res, log: req.body.log })
			}
		}
	}

	info(req, res, next) {
		res.json({ message: 'Example request.' });
	}

	update(req, res, next) {
		res.json({ message: 'Example request.' });
	}

	delete(req, res, next) {
		res.json({ message: 'Example request.' });
	}
}

module.exports = new MainController();
