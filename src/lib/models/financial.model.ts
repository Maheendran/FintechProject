// import mongoose, { Schema, Model } from "mongoose";

// // Interface representing the data structure
// export interface IData {
//   costSpend: number;
//   charityFund: number;
//   revenue: number;
//   profit: number;
//   charityCategory: string;
//   date: number;
// }

// // Define Mongoose schema based on the interface
// const dataSchema = new Schema<IData>({
//   costSpend: { type: Number, required: true },
//   charityFund: { type: Number, required: true },
//   revenue: { type: Number, required: true },
//   profit: { type: Number, required: true },
//   charityCategory: { type: String, required: true },
//   date: { type: Number, required: true }
// }, { timestamps: true });

// // Define Mongoose model using the schema
// export const DataModel: Model<IData & mongoose.Document> = mongoose.model("Data", dataSchema);



import mongoose, { Model, Schema, model, models } from "mongoose";

export interface ITest {
  cost: number;
  charity: number;
  revenue: number;
  profit: number;
  category: string;
  date: Date;

}

export interface TestDocument extends ITest, mongoose.Document {
  cost: number;
  charity: number;
  revenue: number;
  profit: number;
  category: string;
  date: Date;

}

const testSchema = new Schema(
    {

      cost: { type: Number },
      charity: { type: Number },
      revenue: { type: Number },
      profit: { type: Number },
      category: { type: String },
      date: { type: Date },
},
  { timestamps: true }
);


const Financial: Model<TestDocument> =
  models.Financial || model<TestDocument>("Financial", testSchema);

export default Financial;

