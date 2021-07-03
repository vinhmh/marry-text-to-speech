"use strict";

const fs = require('fs');
const request = require('request');
const text = process.argv[2] || "The fault, dear Brutus, is not in our stars, But in ourselves, that we are underlings.";
const outputFile = process.argv[3] || "speech_mary_output.wav";

const options = {
    url: `http://localhost:59125/process?INPUT_TEXT=${text}!&INPUT_TYPE=TEXT&OUTPUT_TYPE=AUDIO&AUDIO=WAVE_FILE&LOCALE=en_US&VOICE=cmu-slt-hsmm`,
    encoding: null // Binary data.
}

request.get(options, function (err, resp, data) {
    if (err || resp.statusCode != 200) {
        console.log(err, resp.body);
    } else {
        try {
            console.log(`Saving output to file: ${outputFile}, length: ${data.length} byte(s)`);
            fs.writeFileSync(outputFile, data, { encoding: 'binary'});
        } catch (e) {
            console.log(e.message);
        }
    }
});