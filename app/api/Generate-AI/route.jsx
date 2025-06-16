import { db } from '@/config/db';
import { coursesTable } from '@/config/schema';
import { auth, currentUser } from '@clerk/nextjs/server';
import {
  GoogleGenAI,
} from '@google/genai';
import axios from 'axios';
import { NextResponse } from 'next/server';



const PROMPT = `Genrate Learning Course depends on following details. In which Make sure to add Course Name, Description, Chapter Name, Image Prompt (Create a modern, flat-style 20 digital illustration representing user Topic. Include UI/UX elements such as mockup screens, text blocks, icons, buttons, and creative workspace tools. Add symbolic elements related to user Course, like sticky notes, design components, and visual aids. Use a vibrant color palette (blues, purples, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing concepts in user Course) for Course Banner in 3d format, Topic under each chapters, Duration for each chapters etc, in JSON format only

Schema:

"course": (

"name": "string"

"description": "string"

"category": "string",

"level": "string",

"include Video": "boolean",

"noofChapters": "number",

"chapters":

"chapterName":

"string"

"duration" "string".

"topics":
"topics": [

"string"

1,

"imagePrompt": "string"
"topics": [

"string"

1,

"imagePrompt": "string"

}

]

}

}

User Input: React js, 3 Chapters`


export async function POST(req) {
  const {courseId ,...FormData} = await req.json();
  const user = await currentUser();
  const { has } = await auth()
  const hasPremiumAccess = has({ plan: 'starter' })

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
          text: PROMPT+JSON.stringify(FormData),
        },
      ],
    },
  ];

  //If user has a created any course
  if(!hasPremiumAccess)
  {
    const result = await db.select().from(coursesTable)
    .where(eq(coursesTable.userEmail, user?.primaryEmailAddress.emailAddress))

    if(result?.length >= 1)
    {
      return NextResponse.json({'resp': 'Limit exceeded'})
    }

  }


  const response = await ai.models.generateContent({
    model,
    config,
    contents,
  });

  console.log(response.candidates[0].content.parts[0].text);
  const RawRes = response?.candidates[0]?.content?.parts[0]?.text;
  const RawJson = RawRes.replace('```json', '').replace('```', '');
  const JSONRes = JSON.parse(RawJson);


  const ImagePrompt = JSONRes.course?.bannerImagePrompt
  //generate image

  const bannerImageUrl = await GenerateImage(ImagePrompt)


   //save database
  const result = await db.insert(coursesTable).values({
    ...FormData,
    courseJson: JSONRes,
    userEmail: user?.primaryEmailAddress?.emailAddress,
    cid: courseId,
    bannerImageUrl : bannerImageUrl
  })
  
  return NextResponse.json({courseId:courseId}); // Save to database and return the response
  
}


const GenerateImage = async(imagePrompt) =>{
  const BASE_URL='https://aigurulab.tech';
  const result = await axios.post(BASE_URL+'/api/generate-image',
        {
            width: 1024,
            height: 1024,
            input: imagePrompt,
            model: 'sdxl',//'flux'
            aspectRatio:"16:9"//Applicable to Flux model only
        },
        {
            headers: {
                'x-api-key': process?.env?.AI_GURU_LAB_API, // Your API Key
                'Content-Type': 'application/json', // Content Type
            },
        })
        console.log(result.data.image)
        return result.data.image; //Output Result: Base 64 Image

}