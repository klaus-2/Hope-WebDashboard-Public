const mongoose = require('mongoose'),
	config = require("../config");

	module.exports = {
		init: () => {
			const dbOptions = {
				useNewUrlParser: true,
				autoIndex: false,
				connectTimeoutMS: 10000,
				family: 4,
				useUnifiedTopology: true,
			};
			mongoose.connect(config.mongoDB, dbOptions);
			mongoose.Promise = global.Promise;
			mongoose.connection.on('connected', () => {
				console.log('Mongoose successfully connected');
			});
			mongoose.connection.on('err', (err) => {
				console.log(`Mongoose has encountered an error: \n ${err.stack}`);
			});
			mongoose.connection.on('disconnected', () => {
				console.log('Mongoose disconnected');
			});
		},
		async ping() {
			const currentNano = process.hrtime();
			await mongoose.connection.db.command({ ping: 1 });
			const time = process.hrtime(currentNano);
			return (time[0] * 1e9 + time[1]) * 1e-6;
		},
	};
