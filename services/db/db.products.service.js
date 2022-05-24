"use strict";

module.exports = {
	name: "db.products",

	started() {
		setInterval(() => {
			this.logger.info("Leaked async handler");
		}, 1000);
	},

	actions: {
		async find() {
			await new Promise((resolve) => {
				setTimeout(() => {
					resolve();
				}, 100);
			});

			return { data: "some result" };
		}
	}
};
