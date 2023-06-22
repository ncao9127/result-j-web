import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
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
