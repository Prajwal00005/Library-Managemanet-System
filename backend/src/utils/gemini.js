import axios from "axios";
import config from "../config/config.js";

const promptGemini = async (message) => {
  const response = await axios.post(
    config.gemini.apiUrl,
    {
      contents: [
        {
          parts: [
            {
              text: message,
            },
          ],
        },
      ],
    },
    {
      headers: {
        "x-goog-api-key": config.gemini.apikey,
      },
    }
  );
  return response.data.candidates[0].content.parts[0].text;
};

export default promptGemini;
