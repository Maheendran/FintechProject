import mongoose, { Model, Schema, model, models } from "mongoose";

export interface ITest {
  cost: number;
  charity: number;
  revenue: number;
  profit: number;
  category: string;
  date: Date;
  uploader: string;
}

export interface TestDocument extends ITest, mongoose.Document {
  cost: number;
  charity: number;
  revenue: number;
  profit: number;
  category: string;
  date: Date;
  uploader: string;
}

const FinancialSchema = new Schema(
  {
    cost: { type: Number },
    charity: { type: Number },
    revenue: { type: Number },
    profit: { type: Number },
    category: { type: String },
    date: { type: Date },
    uploader: { type: String },
  },
  { timestamps: true }
);

const Financial: Model<TestDocument> =
  models.Financial || model<TestDocument>("Financial", FinancialSchema);

export default Financial;
