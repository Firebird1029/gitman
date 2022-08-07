import * as cron from "node-cron";
import runWorkflow from "./workflow";

// Every day at midnight
cron.schedule("0 0 * * *", () => {
	if (Math.random() < Number(process.env.MIDNIGHT_RANDOM_THRESHOLD)) {
		runWorkflow();
	}
});

// Every hour
cron.schedule("0 * * * *", () => {
	if (Math.random() < Number(process.env.HOUR_RANDOM_THRESHOLD)) {
		runWorkflow();
	}
});
