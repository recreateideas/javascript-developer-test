const { httpGet } = require("./mock-http-interface");

const getArnieQuotes = (urls = []) => {
  /** move out if shared across multiple utils/controllers */
  const statusKeyMap = {
    200: "Arnie Quote",
    default: "FAILURE",
  };
  const quotesPromise = Promise.all(
    urls.map(async (url) => {
      const { status, body: bodyString } = await httpGet(url);
      const quote = JSON.parse(bodyString);
      const { message: responseValue } = quote;
      const { [status]: success, default: failure } = statusKeyMap;
      const responseKey = success || failure;
      return { [responseKey]: responseValue };
    })
  );
  return quotesPromise;
};

module.exports = {
  getArnieQuotes,
};
