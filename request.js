const axios = require("axios")

async function scrapeWebsite(url) {
    try {
        const response = await axios.get(url);
        const xml = response.data;

        var parseString = require('xml2js').parseString;
        parseString(xml, function (err, result) {
            console.dir(result);

            for (let article of result.rss.channel[0].item) {
                if (!(typeof article.description === "undefined"))
                     console.log(article.title[0] + ": " + article.description)
                else
                    console.log(article.title[0] + ": " + article.link)
            }
        
            console.log("Done.")
        });
    } catch (error) {
        console.error("Error fetching website data:", error);
    }
}

// Example usage:
// scrapeWebsite("https://rss.orf.at/news.xml");
scrapeWebsite("https://rss.orf.at/science.xml");