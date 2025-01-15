module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{js,jsx,ts,tsx}", // Inclut tous les fichiers React dans src
	],
	theme: {
		extend: {},
	},
	plugins: [
		require('daisyui'),
	],
};
