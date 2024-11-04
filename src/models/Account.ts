import mongoose, { Schema, Document } from 'mongoose';

interface Account extends Document {
    name: string;
    balance: number;
    date: Date;
    currency: string;
    accountType?: string;
}

const AccountSchema: Schema = new Schema({
    name: {type: String, required: true},
    balance: {type: Number, required: true},
    date: {type: Date, required: true},
    currency: { type: String, required: true},
    accountType: { type: String },
});

export default mongoose.models.Account || mongoose.model<Account>('Account', AccountSchema);