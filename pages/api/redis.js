import Redis from 'ioredis';

let redis = new Redis(process.env.REDIS_URL);

export default async function handler(req, res) {

  // List of allowed origins
  const allowedOrigins = [
    "https://resultsjntuh.vercel.app",
    "https://resultsjntuh.netlify.app",
    "https://resultsjntuhv0.netlify.app",
    "https://resultsjntuhv1.netlify.app",
    "https://resultsjntuhv2.netlify.app",
    "https://resultsjntuhv3.netlify.app",
    "https://resultsjntuhv4.netlify.app",
    "http://localhost:3000"
  ];

  // Get the origin of the request
  const origin = req.headers.origin;

  // Check if the request's origin is in the list of allowed origins
  if (allowedOrigins.includes(origin)) {
    // Set the Access-Control-Allow-Origin header to the request's origin
    res.setHeader("Access-Control-Allow-Origin", origin);
    console.log('Access Granted')
  } else {
    // Origin is not in the list of allowed origins
    // You can choose to handle this case based on your requirements
    console.log("Access Denied For This Origin Domain")
    res.status(403).json("Forbidden");
    return;
  }

  // Set CORS headers to allow requests from any origin
  // res.setHeader('Access-Control-Allow-Origin', '*');

  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000, https://resultsjntuh.vercel.app, https://resultsjntuh.netlify.app');

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
