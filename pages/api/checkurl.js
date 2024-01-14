import axios from 'axios';

export default async function handler(req, res) {
  const urls = [
    "http://results.jntuh.ac.in/resultAction",
    "http://202.63.105.184/results/resultAction",
  ];

  const results = [];

  for (let i = 0; i < urls.length; i++) {
    try {
      const response = await axios.get(urls[i], { timeout: 1000 });
      results.push({ url: urls[i], statusCode: response.status });
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        results.push({ url: urls[i], error: 'Timeout' });
      } else {
        results.push({ url: urls[i], error: error.message });
      }
    }
  }

  res.status(200).json(results);
}
