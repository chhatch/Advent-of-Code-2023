const tap = (fn) => (x) => {
  fn(x);
  return x;
};

module.exports = { tap };
