const testEndpoint = (req, res) => {
    res.status(200).send("Hey, this is ok!");
};

module.exports = { testEndpoint };
