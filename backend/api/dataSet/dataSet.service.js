import fs from "fs/promises";
import path from "path";


const CSV_FILE_PATH = path.join(process.cwd(), "data", "terrorData.csv");



// CSV-based functions (alternative to DB functions)
export const DataSetServiceCSV = {
  readCSV,
};

async function readCSV() {
  try {
    const csvData = await fs.readFile(CSV_FILE_PATH, "utf-8");
    const lines = csvData.trim().split("\n");

    if (lines.length === 0) return [];

    // First line is headers
    const headers = lines[0].split(",").map((h) => h.trim());

    // Parse each data line
    const complaints = lines.slice(1).map((line) => {
      const values = line.split(",").map((v) => v.trim());
      const complaint = {};
      headers.forEach((header, idx) => {
        const value = values[idx];
        // Parse numbers and dates
        if (header === "createdAt") {
          complaint[header] = parseInt(value);
        } else if (header === "speed") {
          complaint[header] = parseInt(value);
        } else {
          complaint[header] = value;
        }
      });
      return complaint;
    });

    return complaints;
  } catch (err) {
    if (err.code === "ENOENT") {
      return [];
    }
    throw err;
  }
}

