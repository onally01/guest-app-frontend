/**
 * To set global api url for the app
 */

var apiurl;
if (process.env.NODE_ENV === "production") {
  apiurl = "https://demo-core.geraldcleaners.com";
} else {
  apiurl = "http://localhost:8000";
}

const config = {
  url: {
    apiUrl: apiurl
  }
};

export default config;
