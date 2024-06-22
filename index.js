require("dotenv").config();
const request = require("request-promise");
const pdf = require("pdf-parse");
const PDFParser = require("pdf2json");
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 1000;

const pdfParser = new PDFParser();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", async (req, res) => {
  const { roll } = req.query;

  if (roll) {
    try {
      const response = await request({
        uri: `https://lu.indiaexaminfo.co.in/PATLIPUTRA/YEAR-2023/Vocational/Part-I/${roll}.pdf`,
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
  // let dataBuffer = response;

  // final = await pdf(dataBuffer).then((data) => {
  //   return data.text;
  // });
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

// const starting = 2320140080001;
//   const ending = 2320140080113;
//   let arr = [];
//   for (let i = starting; i < ending; i++) {
//     console.log(i);
//     const response = await request({
//       uri: `https://lu.indiaexaminfo.co.in/PATLIPUTRA/YEAR-2023/Vocational/Part-I/${i}.pdf`,
//       encoding: null,
//       headers: {
//         Accept:
//           "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
//         "Accept-Encoding": "gzip, deflate, br, zstd",
//         "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8,hi;q=0.7",
//         Origin: "https://lu.indiaexaminfo.co.in",
//       },
//     });

//     let dataBuffer = response;

//     pdf(dataBuffer).then((data) => {
//       arr.push(data.text);
//     });
//   }

//   console.log(arr);
