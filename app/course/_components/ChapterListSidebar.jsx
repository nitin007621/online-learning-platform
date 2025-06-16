import React, { useContext } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';


function ChapterListSidebar({ courseInfo }) {
    const course = courseInfo?.courses;
    const enrollCourse = courseInfo?.enrollCourse;
    const courseContent = courseInfo?.courses?.courseContent;
    const { selectedChapterIndexContext, setSelectedChapterIndexContext } = useContext(SelectedChapterIndexContext);
    let completedChapter = enrollCourse?.completedChapter ?? [];

  return (
    <div className='w-70 bg-secondary h-screen p-5'>
        <h2 className="font-bold text-lg">Chapters ({courseContent?.length})</h2>
        <Accordion type="single" collapsible>
            {courseContent?.map((chapter, index) => (
                <AccordionItem  value={chapter?.courseData?.chapterName} key={index}
                    onClick={()=> setSelectedChapterIndexContext(index)}
                    >
                    <AccordionTrigger className={'text-medium font-bold'}>{index + 1}. {chapter?.courseData?.chapterName}</AccordionTrigger>
                    <AccordionContent asChild>
                        <div>
                            {chapter?.courseData?.topics.map((topic, index_)=>{
                                return <h2 key={index_} className={`p-2 my-1 rounded-lg ${completedChapter.includes(index) ? 'bg-green-100 text-green-500' : 'bg-white'}`} > 
                                {completedChapter.includes(index)} {topic?.topic}</h2>
                            })}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    </div>
  )
}

export default ChapterListSidebar