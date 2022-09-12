const { Octokit } = require("@octokit/core");
const functions = require('@google-cloud/functions-framework');

functions.http('githubUser', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  } else {
    const octokit = new Octokit({
      auth: process.env.GHTOKEN
    });
    const response = await octokit.request('GET /search/users', {
      q: `location:${req.query.pref}`,
      per_page: 20,
      page: req.query.page
    });

    res.send(response);
  }
});
