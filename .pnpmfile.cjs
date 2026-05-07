function readPackage(pkg, context) {
  // Allow build scripts for sharp and unrs-resolver
  if (pkg.name === 'sharp' || pkg.name === 'unrs-resolver') {
    pkg.scripts = { ...pkg.scripts };
  }
  return pkg;
}

module.exports = {
  hooks: {
    readPackage
  }
};
