import axios from "axios";
import xml2js from "xml2js";

export const getPrediction = async () => {
  const url =
    "https://api.allorigins.win/get?url=http://predictions.score.ge/rss.xml";

  try {
    // Fetch the XML data through the CORS proxy
    const response = await axios.get(url);

    // The response will be in JSON format with the content in the "contents" field
    const xml = response.data.contents;

    // Parse the XML data
    const parser = new xml2js.Parser({ explicitArray: false });
    const result = await parser.parseStringPromise(xml);

    return {
      props: {
        rssData: result,
      },
    };
  } catch (error) {
    console.error("Error fetching the RSS feed:", error);
    return {
      props: {
        rssData: null,
      },
    };
  }
};
