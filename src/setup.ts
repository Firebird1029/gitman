import { Clone, Credential } from "@figma/nodegit";
import * as path from "path";

(async () => {
	const repo = await Clone(process.env.GIT_REPO as string, path.join(__dirname, "../repo"), {
		fetchOpts: {
			callbacks: {
				certificateCheck: () => 0,
				credentials: () => {
					return Credential.userpassPlaintextNew(process.env.ACCESS_TOKEN as string, "x-oauth-basic");
				},
			},
		},
	});
})().catch((err) => {
	console.error(err);
});
