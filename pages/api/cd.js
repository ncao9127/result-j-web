import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  // Define the URL and payload data
  const url = "https://studentservices.jntuh.ac.in/oss/convocationDetails.html";
  const payload = { htno: "20365A0501" };

  try {
    // Make a POST request
    const response = await axios.post(url, payload, { validateStatus: () => false });

    // Check if the request was successful (status code 200)
    if (response.status === 200) {
      // Load HTML content using Cheerio
      const $ = cheerio.load(response.data);

      // Extract the desired information (replace this with your specific requirements)
      const resultDiv = $('div[align="center"]');
      const tableContent = resultDiv.find('table.transtable');
      const message = tableContent.find('span').text();

      // Send the scraped data as the API response
      res.status(200).json({ message });
    } else {
      res.status(response.status).json({ error: `Failed to retrieve data. Status code: ${response.status}` });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
