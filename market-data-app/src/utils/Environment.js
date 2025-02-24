
// Load environment variables from.env file
const URLs = {
    base_api_url: `${process.env.REACT_APP_BASE_API_URL}/byma-api` || `https://byma-api.onrender.com/byma-api`,
    sub_domain: 'byma-api'
}

export default URLs;
