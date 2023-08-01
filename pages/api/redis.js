import Redis from 'ioredis';

let redis = new Redis(process.env.REDIS_URL);

export default async function handler(req, res) {
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
