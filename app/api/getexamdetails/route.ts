import { MongoClient, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
    const client =new MongoClient(process.env.MONGO_URL!)
    const examId =  request.nextUrl.searchParams.get('exam')
    try{
        await client.connect()
        const db = client.db('maindatabase')
        const exams = db.collection("exams")
        const searchedExam  = await exams.findOne({
            _id:new ObjectId(examId!)
        })
        if(searchedExam){
            searchedExam['mcqs']= null;
            searchedExam['longQuestions']= null;
            searchedExam['codingProblems']= null;
        }
        return NextResponse.json(searchedExam)
    }
    catch(e){
        return NextResponse.json({"message":"Internal server error"})
    }

}