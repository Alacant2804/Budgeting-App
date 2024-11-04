import mongoose, { Schema, Document } from 'mongoose';

interface Expense extends Document {
    name: string;
    amount: number;
    date: Date;
}

const ExpenseSchema: Schema = new Schema({
    name: {type: String, required: true},
    amount: {type: Number, required: true},
    date: {type: Date, required: true},
});

export default mongoose.models.Expense || mongoose.model<Expense>('Expense', ExpenseSchema);