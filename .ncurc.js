// @ts-check
/** @type {import("npm-check-updates").RunOptions} */
module.exports = {
  filter(dependencyName) {
    return dependencyName === "eslint";
  },
  target(dependencyName) {
    if (/^react(-dom)?$/.test(dependencyName) || /next$|(^@next\/.*$)/.test(dependencyName)) {
      return "@canary";
    }
    return "latest";
  },
};
