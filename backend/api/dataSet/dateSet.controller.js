import { DataSetServiceCSV } from "./dataSet.service.js";
import fs from "fs/promises";
import path from "path";

const JSON_FILE_PATH = path.join(process.cwd(), "data", "scores.json");

export async function getDataSet(req, res) {
  try {
    const complaints = await DataSetServiceCSV.readCSV();
    res.json(complaints.slice(0, 50));
  } catch (err) {
    logger.error("Failed to get complaints", err);
    res.status(400).send({ err: "Failed to get complaints" });
  }
}

export async function addPoint(req, res) {
  try {
    const { username, score } = req.body;
    console.log(username, score);

    fs.readFile(JSON_FILE_PATH, "utf-8").then((data) => {
      data = JSON.parse(data)
      const newData = data.map((user) => {
		console.log('user', user);
        if (user.username === username) {
         return  {username: username,  score: user.score + score}
        } else {
          return {
            username: username,
            score: score
          };
        }
      });

      fs.writeFile(JSON_FILE_PATH, JSON.stringify(newData));
    });
  } catch (err) {
    res.status(400).send({ err: "Failed to get complaint" });
  }
}
