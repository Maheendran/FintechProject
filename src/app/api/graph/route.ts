import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongoose";

import Financial from "@/lib/models/financial.model";
import { Aggregate } from "mongoose";
import Item from "antd/es/list/Item";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    await clientPromise();

    const graphTwo = await Financial.aggregate([
      {
        $group: {
          _id: "$category",
          totalCharity: { $sum: "$charity" },
        },
      },
    ]);
    const totalCharityInMillion = graphTwo.reduce((total, item) => total + item.totalCharity, 0) / 1000000;


    console.log(graphTwo, "graphTwo");
    const data = {
      name: `All charity - ${totalCharityInMillion} M`,
      textProps: { x: -25, y: 25 },

      children: graphTwo.map((item) => ({
       
        name: `${item._id} - ${item.totalCharity / 1000000} M`,
        textProps: { x: -25, y: 25 },
        pathProps: { className: "black" },
        children: [],
      })),
    };
// ===============first grpah code============

let dateChecheck = "%Y";
// checkYear.split("-")
const yearMonth:any = 2022;

let convertDate = new Date(parseInt(yearMonth), 1, 1);
const grapOne=await Financial.aggregate([
  {
    $match: {
   
      $expr: {
        $eq: [
          { $dateToString: { format: dateChecheck, date: '$date' } },
          { $dateToString: { format: dateChecheck, date: convertDate } },
        ],
      },
    },
  },
  {
    $group: {
      _id: { $dateToString: { format: "%Y-%m", date: "$date" } }, 
      totalProfit: { $sum: "$profit" }, 
      totalRevenue: { $sum: "$revenue" } 
    }
  },
  {
    $sort: { "_id": 1 } // Sort by _id in ascending order
  }
])


const formattedMonths:any = [];
const totalProfits:any = [];
const totalRevenues:any = [];
const monthsMap:any = {
  '01': 'January', '02': 'February', '03': 'March', '04': 'April',
  '05': 'May', '06': 'June', '07': 'July', '08': 'August',
  '09': 'September', '10': 'October', '11': 'November', '12': 'December'
};
grapOne.forEach(item => {
  // Extract year and month from _id
  const [year, month] = item._id.split('-');
  // Format month name
  const formattedMonth = `${monthsMap[month]} ${year}`;
  // Push formatted month name to array
  formattedMonths.push(formattedMonth);
  // Push total profit and total revenue to respective arrays
  totalProfits.push(Math.round(item.totalProfit));
  totalRevenues.push(Math.round(item.totalRevenue));
});



    //   console.log(data,'graphTwo-------------')
const graphOne:any={
  formattedMonths,totalProfits,totalRevenues
}
    return NextResponse.json({ data: data, status: "success",graphOne });
  } catch (error) {
    console.error(error);
    return NextResponse.json("Server error");
  }
}
