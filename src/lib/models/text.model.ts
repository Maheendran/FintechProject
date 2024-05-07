
import mongoose, { Model, Schema, model, models } from "mongoose";

export interface ITest {
  fname: string;

}

export interface TestDocument extends ITest, mongoose.Document {
  fullName: string;

}

const testSchema = new Schema(
  {
    fname: {
      type: String,
    //   required: true,
    }

  },
  { timestamps: true }
);


const Test: Model<TestDocument> =
  models.Test || model<TestDocument>("Test", testSchema);

export default Test;
