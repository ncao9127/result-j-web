import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  
  // Set CORS headers to allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');

  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000, https://resultsjntuh.vercel.app, https://resultsjntuh.netlify.app, https://resultsjntuhv1.netlify.app, https://resultsjntuhv2.netlify.app, https://resultsjntuhv3.netlify.app');

  // Optionally, you can set other CORS headers if needed
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    const url = 'http://results.jntuh.ac.in/jsp/RCRVInfo.jsp';
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const results = [];

    $('h3').each((index, element) => {
      const notificationData = {};
      const title = $(element).text().trim();
      const dateStartIndex = title.indexOf('(') + 1;
      const dateEndIndex = title.indexOf(')');
      const date = title.substring(dateStartIndex, dateEndIndex);
      const cleanTitle = title.replace(`(${date})`, '').replace('*', '').trim();

      if (/b\.tech|b\.pharmacy|b\.pharm|m\.tech|m\.pharm|m\'pharmacy|mba/i.test(cleanTitle)) {
        notificationData.notification_description = cleanTitle;
        notificationData.notification_date = date;
        results.push(notificationData);
      }
    });

    res.status(200).json(results);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}
