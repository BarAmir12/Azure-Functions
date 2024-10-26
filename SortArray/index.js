module.exports = async function (context, req) {
  const array = req.body.array;
  const sortedArray = array.sort((a, b) => a - b);
  context.res = {
      body: { sortedArray }
  };
};
