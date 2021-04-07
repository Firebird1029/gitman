import * as fs from "fs";
import * as path from "path";

async function runWorkflow() {
	fs.appendFileSync(path.join(__dirname, "../", "repo", process.env.FILE_TO_EDIT), process.env.WRITE_MESSAGE);
}
export default runWorkflow;
