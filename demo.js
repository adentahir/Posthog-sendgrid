const fetch = require('node-fetch');

require('dotenv').config();


const POSTHOG_PERSONAL_API_KEY = process.env.POSTHOG_PERSONAL_API_KEY;
const PROJECT_ID = process.env.PROJECT_ID;
const EVENT_NAME = '$identify';
const MINUTES_AGO = 30;

async function getRecentIdentifyEvents() {
  const after = new Date(Date.now() - MINUTES_AGO * 600000 * 1000).toISOString();
  const response = await fetch(`https://app.posthog.com/api/projects/${PROJECT_ID}/events/?event=${EVENT_NAME}&after=${after}`, {
    headers: {
      'Authorization': `Bearer ${POSTHOG_PERSONAL_API_KEY}`
    }
  });
  const data = await response.json();
  return data.results;
}

getRecentIdentifyEvents().then(identifyEvents => {
  console.log(identifyEvents);
});
