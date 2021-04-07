import { Clone } from "nodegit";

(async () => {
	const repo = await Clone.clone(process.env.GIT_REPO, "./repo");
})().catch((err) => {
	console.error(err);
});
