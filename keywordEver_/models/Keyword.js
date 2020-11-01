import mongoose from "mongoose";

const KeywordSchema = new mongoose.Schema({
    status: {
        type: Date,
        required: true,
    },
    keywordName: {
        type: String,
        required: true,
    },
    amtPc: {
        type: Number,
        required: true,
    },
    amtMobile: {
        type: Number,
        required: true,
    },
    amtTotal: {
        type: Number,
        required: true,
    },
    blogTotal: {
        type: Number,
        required: true,
    },
    competition: {
        type: Number,
        required: true,
    },
    isCompleteness: {
        type: Boolean,
        required: true,
    },
});

const model = mongoose.model("keyword", KeywordSchema);

export default model;