"use strict";

module.exports = {
	name: "consumer",

	settings: {

	},

	dependencies: ["db.products"],

	events: {

	},

	methods: {

	},

	created() {
		this.logger.info("Created");
	},

	async started() {
		this.logger.info("Started");

		const ctx = this.broker.ContextFactory.create(
			this.broker,
			null,
			{},
			{ caller: this.fullName }
		);

		const INTERVAL = 10;

		let i = 0;
		setInterval(async () => {
			// this.logger.info('Call db find!', i)

			await ctx.call("db.products.find", {});
		}, INTERVAL);
	},

	async stopped() {
		this.logger.info("Stopped");
	}
};
