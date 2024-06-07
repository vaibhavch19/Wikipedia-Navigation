const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');


const app = express();

const port = 3000;
// Fetches the HTML content of a Wikipedia page from the given URL. 
async function fetchPageData(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching page data: ${url}, error`);
        throw new Error('Failed to fetch Wikipedia page data');
    }
}
// Extracts and returns the first valid Wikipedia link from the given HTML content.
async function extractFirstLink(html) {
    const $ = cheerio.load(html);
    const mainContent = $('#content').first();
    const firstLink = mainContent.find('p > a').first();
    return firstLink ? firstLink.attr('href') : null;
}


// Traverses Wikipedia pages starting from the given URL, following the first link until the "Philosophy" page is reached.
async function findPhilosophy(url, visitedPages = [], requestCount = 0) {
    try {
        const pageData = await fetchPageData(url);
        const firstLink = await extractFirstLink(pageData);

        if (!firstLink) {
            throw new Error('No valid links found on the page');
        }

        const nextPageUrl = `https://en.wikipedia.org${firstLink}`;
        visitedPages.push(nextPageUrl);

        if (firstLink === '/wiki/Philosophy') {
            return { steps: requestCount + 1, visitedPages };
        }

        return findPhilosophy(nextPageUrl, visitedPages, requestCount + 1);
    } catch (error) {
        console.error(`Error finding Philosophy: ${error.message}`);
        throw error;
    }
}


// Endpoint that initiates the process to find the "Philosophy" page starting from a specified Wikipedia URL.
app.get('/philosophy-trail', async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'Missing URL parameter' });
    }

    try {
        const { steps, visitedPages } = await findPhilosophy(url);
        res.json({ steps, visitedPages });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
