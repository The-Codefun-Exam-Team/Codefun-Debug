// @ts-check
/** @type {import("npm-check-updates").RunOptions} */
module.exports = {
  target: (dependencyName) => {
    if (/^react(-dom)?$/.test(dependencyName)) {
      return "@canary";
    }
    return "latest";
  },
};
