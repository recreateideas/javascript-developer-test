const { httpGet } = require("./mock-http-interface");

const getArnieQuotes = async (urls = []) => {
  /** move out if shared across multiple utils/controllers */
  const statusKeyMap = {
    200: "Arnie Quote",
    500: "FAILURE",
  };
  const quotes = await Promise.all(
    urls.map(async (url) => {
      const { status, body: bodyString } = await httpGet(url);
      const quote = JSON.parse(bodyString);
      const { message: responseValue } = quote;
      const responseKey = statusKeyMap[status];
      return { [responseKey]: responseValue };
    })
  );
  return quotes;
};

module.exports = {
  getArnieQuotes,
};
