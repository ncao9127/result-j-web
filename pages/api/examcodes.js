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
    const examCodes = await getExamCodes();
    res.status(200).json(examCodes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch exam codes.' });
  }
}

async function getExamCodes() {
  const url = 'http://results.jntuh.ac.in/jsp/home.jsp';
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  const examCodes = {
    btech: {
      R18: {},
      R22: {},
    },
    bpharmacy: {
      R17: {},
      R22: {},
    },
    mtech: {
      R19: {},
      R22: {},
    },
    mpharmacy: {
      R19: {},
      R22: {},
    },
    mba: {
      R19: {},
      R22: {},
    },
  };

  const degree = Object.keys(examCodes);

  for (let table = 0; table < 5; table++) {
    const results = $(`table:eq(${table}) tr`);

    const regulations = Object.keys(examCodes[degree[table]]);

    for (let i = 0; i < results.length; i++) {
      const result = results.eq(i);
      const resultLink = result.find('td:eq(0) a').attr('href');
      const resultText = result.text();

      for (const regulation of regulations) {
        if (resultText.includes(regulation)) {
          const examCode = extractExamCode(resultLink);
          let category;

          if (table < 2) {
            category = categorizeExamCode(resultText, examCode);
          } else {
            category = categorizeMastersExamCode(resultText, examCode);
          }

          if (category !== null) {
            examCodes[degree[table]][regulation][category] ??= [];
            if (!examCodes[degree[table]][regulation][category].includes(examCode)) {
              examCodes[degree[table]][regulation][category].push(examCode);
            }
          }
        }
      }
    }

    for (const regulation of regulations) {
      for (const category of Object.keys(examCodes[degree[table]][regulation])) {
        examCodes[degree[table]][regulation][category].sort();
      }
      examCodes[degree[table]][regulation] = Object.fromEntries(
        Object.entries(examCodes[degree[table]][regulation]).sort((a, b) => a[0].localeCompare(b[0]))
      );
    }
  }

  return examCodes;
}

function extractExamCode(resultLink) {
  const examCodeIndex = resultLink.indexOf('examCode');
  const examCode = resultLink.substring(examCodeIndex + 9, examCodeIndex + 13);

  try {
    if (examCode[3] === '&') {
      return examCode.substring(0, 3);
    }
  } catch {
    return examCode;
  }

  return examCode;
}

function categorizeExamCode(resultText, examCode) {
  if (resultText.includes(' I Year I ')) {
    return '1-1';
  } else if (resultText.includes(' I Year II ')) {
    return '1-2';
  } else if (resultText.includes(' II Year I ')) {
    return '2-1';
  } else if (resultText.includes(' II Year II ')) {
    return '2-2';
  } else if (resultText.includes(' III Year I ')) {
    return '3-1';
  } else if (resultText.includes(' III Year II ')) {
    return '3-2';
  } else if (resultText.includes(' IV Year I ')) {
    return '4-1';
  } else if (resultText.includes(' IV Year II ')) {
    return '4-2';
  } else {
    return null;
  }
}

function categorizeMastersExamCode(resultText, examCode) {
  if (resultText.includes(' I Semester')) {
    return '1-1';
  } else if (resultText.includes(' II Semester')) {
    return '1-2';
  } else if (resultText.includes(' III Semester')) {
    return '2-1';
  } else if (resultText.includes(' IV Semester')) {
    return '2-2';
  } else {
    return null;
  }
}

