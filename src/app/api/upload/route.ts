import { IncomingMessage, ServerResponse } from "http";
import { NextRequest, NextResponse } from "next/server";
import formidable from "formidable";
import clientPromise from "@/lib/mongoose";
import * as xlsx from "xlsx";
import Financial from "@/lib/models/financial.model";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await clientPromise();

    const formdatas = await req.formData();
    const file: any = formdatas.get("file");

    if (!file) {
      return NextResponse.json({ message: "File not found" });
    }

    interface SheetData {
      [key: string]: any;
    }
    if (!file) {
      return NextResponse.json("SDSDSS");
    }
    // const file = req.files.file;
    const newdata = Buffer.from(await file.arrayBuffer());
    const workbook = xlsx.read(newdata, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const sheetData: any = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    const tempArray = [];
console.log(sheetData,'sheetData')
    const headerLength = sheetData[0].length;

    for (let i = 1; i < sheetData.length; i++) {
      const row = sheetData[i];
      if (row.length !== headerLength) {
        tempArray.push(row);
      } else {
        const date = new Date((parseInt(row[5])  - 25569) * 86400 * 1000); // Adjusting for the Excel epoch and converting milliseconds to days

// Get the year, month, and day components of the date
const year = date.getFullYear();
const month = date.getMonth() + 1; // JavaScript months are 0-based, so add 1
const day = date.getDate();

// Function to add leading zeros to numbers less than 10
const addLeadingZero = (num: number): string => {
  return num < 10 ? `0${num}` : `${num}`;
};


const formattedDate = `${year}-${addLeadingZero(month)}-${addLeadingZero(day)}`;


        const document = {
          cost: row[0],
          charity: row[1],
          revenue: row[2],
          profit: row[3],
          category: row[4],
          date: formattedDate,
        };

        const data = new Financial(document);
        try {
          await data.save();
          console.log("file saved successfully:", data);
        } catch (error) {
          console.error("Error saving data:", error);
        }
      }
    }

    return NextResponse.json({message:"file uploaded successfully",status:"success"});
  } catch (error) {
    console.error(error);
    return NextResponse.json("Server error");
  }
}
