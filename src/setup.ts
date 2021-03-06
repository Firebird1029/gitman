import { Clone, Cred } from "nodegit";
import * as path from "path";

(async () => {
	const repo = await Clone.clone(process.env.GIT_REPO, path.join(__dirname, "../repo"), {
		fetchOpts: {
			callbacks: {
				certificateCheck: () => 0,
				credentials: () => {
					return Cred.userpassPlaintextNew(process.env.ACCESS_TOKEN, "x-oauth-basic");
				},
			},
		},
	});
})().catch((err) => {
	console.error(err);
});
