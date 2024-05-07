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


    // for (let i = 1; i < sheetData.length; i++) {
    //   const row = sheetData[i];
    //   if (row.length !== headerLength) {
    //     tempArray.push(row);
    //   } else {
    //     const date = new Date((parseInt(row[5]) - 25569) * 86400 * 1000);
    //     const year = date.getFullYear();
    //     const month = date.getMonth() + 1;
    //     const day = date.getDate();

    //     const addLeadingZero = (num: number): string => {return num < 10 ? `0${num}` : `${num}`;};
    //     const formattedDate = `${year}-${addLeadingZero( month )}-${addLeadingZero(day)}`;

    //     const document = {
    //       cost: row[0],
    //       charity: row[1],
    //       revenue: row[2],
    //       profit: row[3],
    //       category: row[4],
    //       date: formattedDate,
    //     };

    //     const data = new Financial(document);
    //     await data.save();
    //   }
    // }
    // const processData = (sheetData:any) => {
    //   return new Promise((resolve, reject) => {
    //     let tempArray = [];
     
    //     const addLeadingZero = (num:number) => (num < 10 ? `0${num}` : `${num}`);
    
    //     const promises = [];
    
    //     for (let i = 1; i < sheetData.length; i++) {
    //       const row = sheetData[i];
    //       if (row.length !== headerLength) {
    //         tempArray.push(row);
    //       } else {
    //         const date = new Date((parseInt(row[5]) - 25569) * 86400 * 1000);
    //         const year = date.getFullYear();
    //         const month = date.getMonth() + 1;
    //         const day = date.getDate();
    
    //         const formattedDate = `${year}-${addLeadingZero(month)}-${addLeadingZero(day)}`;
    
    //         const document = {
    //           cost: row[0],
    //           charity: row[1],
    //           revenue: row[2],
    //           profit: row[3],
    //           category: row[4],
    //           date: formattedDate,
    //         };
    
    //         const promise = new Promise((resolve, reject) => {
    //           const data = new Financial(document);
    //              data.save()
    //             .then(savedData => resolve(savedData))
    //             .catch(error => reject(error));
    //         });
    
    //         promises.push(promise);
    //       }
    //     }
    
    //     Promise.all(promises)
    //       .then(() => resolve(tempArray))
    //       .catch(error => reject(error));
    //   });
    // };
  
    // processData(sheetData)
    //   .then(tempArray => {
    //     console.log("Processed data successfully.");
    //     console.log("Remaining rows:", tempArray);
    //   })
    //   .catch(error => {
    //     console.error("Error processing data:", error);
    //   });


    const promises = sheetData.map(async (row:any) => {
      if (row.length !== headerLength) {
        tempArray.push(row);
      } else {
        const date = new Date((parseInt(row[5]) - 25569) * 86400 * 1000);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const addLeadingZero = (num: number): string => {return num < 10 ? `0${num}` : `${num}`;};
        const formattedDate = `${year}-${addLeadingZero(month)}-${addLeadingZero(day)}`;
    
        const documentObject = {
          cost: row[0],
          charity: row[1],
          revenue: row[2],
          profit: row[3],
          category: row[4],
          date: formattedDate,
        };
    
        try {
          const data = new Financial(documentObject); 
          await data.save();
          console.log("Document saved successfully:", documentObject);
        } catch (error) {
          console.error("Error saving document:", error);
        }
      }
    });
    
    await Promise.all(promises);
    



    
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
