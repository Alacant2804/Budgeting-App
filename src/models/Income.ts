import mongoose, { Schema, Document } from 'mongoose';

interface Income extends Document {
    name: string;
    amount: number;
    date: Date;
}

const IncomeSchema: Schema = new Schema({
    name: {type: String, required: true},
    amount: {type: Number, required: true},
    date: {type: Date, required: true},
});

export default mongoose.models.Income || mongoose.model<Income>('Income', IncomeSchema);