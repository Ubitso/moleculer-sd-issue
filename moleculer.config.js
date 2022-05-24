"use strict";

module.exports = {
	namespace: "",
	nodeID: null,
	metadata: {},

	logger: {
		type: "Console",
		options: {
			colors: true,
			moduleColors: false,
			formatter: "full",
			objectPrinter: null,
			autoPadding: false
		}
	},
	logLevel: "info",

	transporter: 'redis://localhost:6379',

	cacher: null,

	serializer: "JSON",

	requestTimeout: 10 * 1000,

	retryPolicy: {
		enabled: false,
		retries: 5,
		delay: 100,
		maxDelay: 1000,
		factor: 2,
		check: err => err && !!err.retryable
	},

	maxCallLevel: 100,

	heartbeatInterval: 10,
	heartbeatTimeout: 30,

	contextParamsCloning: false,

	tracking: {
		enabled: true,
		shutdownTimeout: 5000,
	},

	disableBalancer: false,

	registry: {
		strategy: "RoundRobin",
		preferLocal: false,
		discoverer: {
			type: 'Local'
		}
	},

	circuitBreaker: {
		enabled: false,
		threshold: 0.5,
		minRequestCount: 20,
		windowTime: 60,
		halfOpenTime: 10 * 1000,
		check: err => err && err.code >= 500
	},

	bulkhead: {
		enabled: false,
		concurrency: 10,
		maxQueueSize: 100,
	},

	validator: true,

	errorHandler: null,

	metrics: {
		enabled: false,
	},

	// tracing: {
	// 	enabled: true,
	// 	exporter: {
	// 		type: "Console", // Console exporter is only for development!
	// 		options: {
	// 			logger: null,
	// 			colors: true,
	// 			width: 100,
	// 			gaugeWidth: 40
	// 		}
	// 	}
	// },

	tracing: {
		enabled: false
	},

	middlewares: [
		{
			started: (broker) => {
				const UNHANDLED_REJECTION_CODE = 20
				const UNHANDLED_EXCEPTION_CODE = 30

				const handleProcessSignal = async signal => {
					const stack = new Error().stack

					broker.logger.info(`Node '${process.env.APP_ID}' received process signal ${signal}`, {stack})
				}

				const handleUnhandledRejection = (reason, promise) => {
					broker.logger.error('Handling unhandledRejection', { reason, promise })

					process.exit(UNHANDLED_REJECTION_CODE)
				}

				const handleUncaughtException = (err, origin) => {
					broker.logger.error('Handling uncaughtException', { err, origin })

					process.exit(UNHANDLED_EXCEPTION_CODE)
				}

				process.on('beforeExit', handleProcessSignal)
				process.on('exit', handleProcessSignal)
				process.on('SIGINT', handleProcessSignal)
				process.on('SIGTERM', handleProcessSignal)

				process.on('unhandledRejection', handleUnhandledRejection)
				process.on('uncaughtException', handleUncaughtException)
			}
		}
	],

	replCommands: null,

	created(broker) {

	},

	async started(broker) {

	},

	async stopped(broker) {

	}
};
