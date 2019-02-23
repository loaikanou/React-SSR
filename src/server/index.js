import React from "react";
import { renderToString } from "react-dom/server";
import express from "express";
import App from "../shared/App";

const app = express();

app.use(express.static("public"));

app.get("*", (req, res) => {
  const reactDom = renderToString( <App /> );
  res.send( htmlTemplate(reactDom) );
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});

function htmlTemplate( reactDom ) {
    return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>SSR - React Application</title>
          </head>
          <body>
            <div id="root">${reactDom}</div>
            <script src="/bundle.js"></script>
          </body>
        </html>
    `;
}
