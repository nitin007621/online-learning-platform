import { stringify } from "uuid";
import {
  GoogleGenAI,
} from '@google/genai';

import { NextResponse } from "next/server";
import axios from "axios";
import { coursesTable } from "@/config/schema";
import { db } from "@/config/db";
import { eq } from "drizzle-orm";

const PROMPT = `Depends on Chapter name and Topic Generate content for each topic in HTML and give response in JSON format.

Schema:{
chapterName:<>,
{
topic:<>,
content:<>
}
}
: User Input:`
export async function POST(req){
    const{courseJson, courseTitle, courseId} = await req.json();

    const promises = courseJson?.chapters?.map(async(chapter)=>{
        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY,
         });
        const config = {
                responseMimeType: 'text/plain',
        };
        const model = 'gemini-2.5-flash-preview-04-17';
        const contents = [
        {
            role: 'user',
            parts: [
        {
          text: PROMPT+JSON.stringify(chapter),
        },
      ],
    },
  ];

  const response = await ai.models.generateContent({
    model,
    config,
    contents,
  });
  console.log(response.candidates[0].content.parts[0].text);
  const RawRes = response?.candidates[0]?.content?.parts[0]?.text;
  const RawJson = RawRes.replace('```json', '').replace('```', '');
  const JSONRes = JSON.parse(RawJson);

  //Generate Youtube video
  const youtubeData = await GetYoutubeVideo(chapter?.chapterName)
  console.log({
    youtubeVideo: youtubeData,
    courseData: JSONRes
  })
  return {
    youtubeVideo: youtubeData,
    courseData: JSONRes
  };


    })

    const CourseContent = await Promise.all(promises)

    //Save to db
    const dbRes = await db.update(coursesTable).set({
      courseContent: CourseContent
    }).where(eq(coursesTable.cid, courseId))


    return NextResponse.json({
        courseName: courseTitle,
        CourseContent: CourseContent
    })
}


const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search"

const GetYoutubeVideo=async(topic)=>{
  const params={
    part:'snippet',
    q:topic,
    maxResult:4,
    type:'video',
    key: process.env.YOUTUBE_API_KEY
  }
  const res = await axios.get(YOUTUBE_BASE_URL, { params });
  const youtubeVideoListRes =  res.data.items;
  const youtubeVideoList = []
  youtubeVideoListRes.forEach(item=>{
    const data = {
      videoId: item.id?.videoId,
      title: item?.snippet?.title
    }
    youtubeVideoList.push(data);
  })
  console.log("youtubeVideoList",youtubeVideoList)
  return youtubeVideoList;
}