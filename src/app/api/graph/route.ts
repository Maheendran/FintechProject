import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongoose";
import Financial from "@/lib/models/financial.model";

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

    let dateChecheck = "%Y";
    const yearMonth: any = 2023;
    let convertDate = new Date(parseInt(yearMonth), 1, 1);

    const graphOne = await Financial.aggregate([
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
          totalRevenue: { $sum: "$revenue" },
        },
      },
      {
        $sort: { "_id": 1 },
      }
    ]);

    const formattedMonths: any = [];
    const totalProfits: any = [];
    const totalRevenues: any = [];
    const monthsMap: any = {
      '01': 'January', '02': 'February', '03': 'March', '04': 'April',
      '05': 'May', '06': 'June', '07': 'July', '08': 'August',
      '09': 'September', '10': 'October', '11': 'November', '12': 'December'
    };
    graphOne.forEach(item => {
      const [year, month] = item._id.split('-');
      const formattedMonth = `${monthsMap[month]} ${year}`;
      formattedMonths.push(formattedMonth);
      totalProfits.push(Math.round(item.totalProfit));
      totalRevenues.push(Math.round(item.totalRevenue));
    });

    const graphOneData = {
      formattedMonths, totalProfits, totalRevenues
    };

    const customResponse = NextResponse.json({ data, status: "success", graphOne: graphOneData });
    customResponse.headers.set('Cache-Control', 'no-store');

    return customResponse;
  } catch (error) {
    console.error(error);
    return NextResponse.json("Server error");
  }
}
