export default {
	extends: ["@commitlint/config-conventional"],
	rules: {
		"type-enum": [
			2,
			"always",
			["feat", "fix", "docs", "style", "refactor", "test", "chore"],
		],
		"subject-empty": [2, "never"],
		"type-empty": [2, "never"],
	},
};
