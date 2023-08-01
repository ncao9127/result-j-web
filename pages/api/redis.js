import Redis from 'ioredis';

let redis = new Redis(process.env.REDIS_URL);

export default async function handler(req, res) {

  // Set CORS headers to allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');

  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000, https://resultsjntuh.vercel.app, https://resultsjntuh.netlify.app, https://resultsjntuhv1.netlify.app, https://resultsjntuhv2.netlify.app, https://resultsjntuhv3.netlify.app');

  // Optionally, you can set other CORS headers if needed
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const rollNumber = req.query['htno'];

  try {
    // Get data from Redis cache using the rollNumber as the key
    const cache = await redis.get(rollNumber);

    if (cache) {
      console.log("Data found in cache for rollNumber:", rollNumber);
      const data = JSON.parse(cache);
      return res.status(200).json(data);
    } else {
      console.log("Data not found in cache for rollNumber:", rollNumber);
      return res.status(404).json("Data not found in cache");
    }
  } catch (error) {
    console.error("Error while fetching data from cache:", error);
    return res.status(500).json("Internal server error");
  }
}
