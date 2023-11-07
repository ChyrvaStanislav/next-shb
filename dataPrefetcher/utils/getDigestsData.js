const { resolve } = require('path');
const { mkdir, writeFile } = require('fs').promises;
const { existsSync } = require('fs');
const axios = require("axios");
const { DIGEST_DATA_PATH, DIGEST_URL_PART, EXCLUDED_POST_IDS } = require("../constants.js");

const getDigestsData = async (digestId, contentUrl) => {
    try {
        const data = await axios.get(`${contentUrl}${DIGEST_URL_PART}${digestId}`);
        if (!existsSync(`${process.cwd()}${DIGEST_DATA_PATH}`)) {
            await mkdir(`${process.cwd()}${DIGEST_DATA_PATH}`);
        }

        await writeFile(resolve(`${process.cwd()}${DIGEST_DATA_PATH}/${digestId}.js`), `export default ${JSON.stringify(data?.data)}`);
        console.log(`Fetched "${digestId}: digest data`);
    } catch (e) {
        console.log(`ERROR getDigestsData: from ${digestId}; ${e.message}`);
    }
};

module.exports = getDigestsData;