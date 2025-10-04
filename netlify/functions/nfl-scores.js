exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const week = event.queryStringParameters?.week;
  
  const espnUrl = week 
    ? `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=${week}`
    : 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard';

  try {
    const response = await fetch(espnUrl);
    
    if (!response.ok) {
      throw new Error(`ESPN API returned ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data,
        timestamp: new Date().toISOString()
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};
