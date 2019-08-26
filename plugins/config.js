/**
 * To set global api url for the app
 */

var apiurl;
if (process.env.NODE_ENV === "production") {
  apiurl = "https://quiet-gorge-70843.herokuapp.com";
} else {
  apiurl = "http://localhost:8000";
}

const config = {
  url: {
    apiUrl: apiurl
  }
};

export default config;
