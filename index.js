require("dotenv").config();
const request = require("request-promise");
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 1000;

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.use(express.json());

app.get("/", async (req, res) => {
  const { roll, year, part, type } = req.query;

  if (roll && year && part && type) {
    try {
      const response = await request({
        uri: `${process.env.PPU_URL}/YEAR-${year}/${type}/${part}/${roll}.pdf`,
        encoding: null,
        headers: {
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "Accept-Encoding": "gzip, deflate, br, zstd",
          "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8,hi;q=0.7",
          Origin: "https://lu.indiaexaminfo.co.in",
        },
      });

      if (!response) {
        throw new Error("Not FOund");
      }

      res.setHeader("Content-Type", "application/pdf");

      return res.status(200).send(response);
    } catch (error) {
      return res.status(404).send("Error Occured");
    }
  }
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
