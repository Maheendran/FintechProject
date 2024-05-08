import { NextRequest, NextResponse } from "next/server";
import Financial from "@/lib/models/financial.model";
import clientPromise from "@/lib/mongoose";
import * as xlsx from "xlsx";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await clientPromise();

    const formdatas = await req.formData();
    const file: any = formdatas.get("file");
    if (!file) {
      return NextResponse.json({ message: "File not found" });
    }

    const newdata = Buffer.from(await file.arrayBuffer());
    const workbook = xlsx.read(newdata, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const sheetData: any = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    const tempArray = [];
    const headerLength = sheetData[0].length;
    const cookiesAccessToken: any = req?.cookies.get("Email");
    const email=cookiesAccessToken?.value

    const promises = sheetData.slice(1)?.map(async (row: any) => {
      if (row.length !== headerLength) {
          tempArray.push(row);
      } else {
          try {

              const dateValue = parseInt(row[5]);
              if (isNaN(dateValue)) {
                  throw new Error('Invalid date value',);
              }
  
              const date = new Date((dateValue - 25569) * 86400 * 1000);
              const year = date.getFullYear();
              const month = date.getMonth() + 1;
              const day = date.getDate();
              const addLeadingZero = (num: number): string => { return num < 10 ? `0${num}` : `${num}`; };
              const formattedDate = `${year}-${addLeadingZero(month)}-${addLeadingZero(day)}`;
  
              const documentObject = {
                  cost: row[0],
                  charity: row[1],
                  revenue: row[2],
                  profit: row[3],
                  category: row[4],
                  date: formattedDate,
                  uploader:email
              };
             
              const data = new Financial(documentObject);
             console.log(data,'data')
              await data.save();
          } catch (error) {
              console.error("Error processing row:", error);
          }
      }
  });
  




  try {
      await Promise.all(promises);
      console.log("All documents saved successfully.");
  } catch (error) {
      console.error("Error saving documents:", error);
  }
  
    



    
    return NextResponse.json({
      message: "file uploaded successfully",
      status: "success",
      errorData: tempArray.length,
    },{status:200});
  } catch (error) {
    console.error(error);
    return NextResponse.json("Server error");
  }
}
