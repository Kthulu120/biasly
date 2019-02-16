const express = require('express');
const app = express();
const request = require('request');
const gkey = require('./secret.unique-alpha-231216-48b359697dec.json');
const exec = require('child_process').exec;

app.get('/isBias/:text', function (req, res) {
   exec(`curl -X POST \\
     -H "Authorization: Bearer ${gkey.key}" \\
     -H "Content-Type: application/json" \\
     https://automl.googleapis.com/v1beta1/projects/unique-alpha-231216/locations/us-central1/models/TCN4939235904825945126:predict \\
     -d '{
           "payload" : {
             "textSnippet": {
                  "content": "${req.params.text}",
                   "mime_type": "text/plain"
              },
           }
         }'`, function (err, stdout, stderr)  {
         if (err) console.log(err);
         let data = JSON.parse(stdout);
         console.log(data);
         data.payload = data.payload.sort((a, b) => b.classification.score - a.classification.score);
         if (data.payload[0].displayName != 'neutral' || data.payload[0].classification.score < 0.6) {
            exec(`curl -X POST \
            -H "Authorization: Bearer ${gkey.key}" \
            -H "Content-Type: application/json" \
            https://automl.googleapis.com/v1beta1/projects/unique-alpha-231216/locations/us-central1/models/TCN4472931150532309038:predict \
            -d '{
              "payload" : {
                "textSnippet": {
                     "content": "${req.params.text}",
                      "mime_type": "text/plain"
                 },
              }
            }'`, function (err, stdout, stderr) {
               if (err) console.log(err);
               let data2 = JSON.parse(stdout);
               data2.payload = data2.payload.sort((a, b) => b.classification.score - a.classification.score);
               if (data2.payload[0].classification.score < 0.6) {
                  res.json({'bias': 'neutral'});
               } else  {
                  res.json({'bias': data2.payload[0].displayName});
               }
            });
         } else {
            res.json({'bias': 'neutral'});
         }
      });
});

const port = 4123 || process.argv[0];

app.listen(port, function () {
   console.log(`App listening on port ${port}`);
});
