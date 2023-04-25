const { SYSTEM_PROMPT } = require("../utils/constants");
const { talkToGPT } = require("../utils/talk-to-gpt");

const chat = async (req, res) => {
    const { messages } = req.body;
    messages.unshift({ role: "system", content: SYSTEM_PROMPT });
    const gptResponse = await talkToGPT(messages);

    res.send({
        data: { reply: gptResponse },
    });
};

module.exports = { chat };
