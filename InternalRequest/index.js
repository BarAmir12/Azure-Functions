
module.exports = async function (context, req) {
  console.log(req.body)
  context.res = {
    status: 200,
    body: {
      'summary': 'this is the summary',
      'alternatives':
        {
          'contradictory':
          [
            {
              'title': 'tttttttt',
              'link': 'http://www.google.com'
            }
          ]
        }
    }
  }
};
