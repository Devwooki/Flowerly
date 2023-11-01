const {Configuration, OpenAIApi} = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

(async () => {
    try {
        const response = await openai.createImage({
        prompt: "a bouquet of red roses and pink astilbe",
        n: 4,
        size: "1024x1024",
        });
        console.log(response.data.data[0].url);
        console.log(response.data.data[0].base64);
        bouquets.push({
        url: response.data.data[0].url,
        base64: response.data.data[0].base64,
        });
    } catch (error) {
        if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
        } else {
        console.log(error.message);
        }
    }
})();