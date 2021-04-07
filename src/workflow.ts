import * as fs from "fs";
import * as path from "path";
import { Cred, Enums, Remote, Repository, Signature } from "nodegit";

async function runWorkflow() {
	fs.appendFileSync(path.join(__dirname, "../repo", process.env.FILE_TO_EDIT), process.env.WRITE_MESSAGE);

	const repo = await Repository.open(path.resolve(__dirname, "../repo/.git"));

	const index = await repo.refreshIndex();
	await index.addAll();
	await index.write();
	const oid = await index.writeTree();

	const parent = await repo.getHeadCommit();
	const author = Signature.now(process.env.AUTHOR_NAME, process.env.AUTHOR_EMAIL);
	const date = new Date().toLocaleString("en-US");
	const commitId = await repo.createCommit("HEAD", author, author, date, oid, [parent]);

	const remote = await repo.getRemote("origin");

	await remote.push(["refs/heads/master:refs/heads/master"], {
		callbacks: {
			certificateCheck: () => 0,
			credentials: () => {
				return Cred.userpassPlaintextNew(process.env.ACCESS_TOKEN, "x-oauth-basic");
			},
		},
	});
}
export default runWorkflow;
