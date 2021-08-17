const fetch = require('node-fetch');
const express = require('express');

const app = express();

app.get('/:slug', async (req, res) => {
  const resp = await fetch('https://graph.codeday.org/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `query ShowcaseProjectBySlug ($slug: String!) { showcase { project( slug: $slug ) { id } } }`,
      variables: { slug: req.param('slug') },
    }),
  });
  const data = await resp.json();
  const id = data?.data?.showcase?.project?.id;

  if (id) return res.redirect(302, `https://showcase.codeday.org/project/${id}`);
  res.sendStatus(404);
});

app.listen(3000);
