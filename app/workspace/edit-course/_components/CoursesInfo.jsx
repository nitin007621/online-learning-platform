import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Book, Clock, Loader, Loader2Icon, PlayCircle, Settings, Signal, TrendingUpDown } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';


function CoursesInfo({course, viewCourse}) {
  const courseLayout = course?.courseJson?.course;
  const[loading, setloading] = useState(false);
  const router = useRouter();
  const GenerateCourseContent =async()=>{
    setloading(true)
    try{
    const result = await axios.post('/api/generate-course-content',{
      courseJson:courseLayout,
      courseTitle:course?.name,
      courseId:course?.cid
    });
    console.log(result.data)
    setloading(false);
    router.replace('/workspace')
    toast.success('Course Created Succesfully')
  }
  catch(e){
    console.log(e)
    setloading(false);
    toast.error('Server side error, Try Again!')


  }

  }
  return (
    <>
      <div className='flex-row-reverse md:flex gap-5 justify-between p-5 rounded-2xl shadow'>
        <div className='flex flex-col gap-4'>
          <h2 className='font-bold text-4xl'>{courseLayout?.name}</h2>
          <p className='line-clamp-2 text-gray-500'>{courseLayout?.description}</p>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                <div className='flex gap-6 items-center p-3 rounded-lg shadow'>
                 <Clock className='text-blue-500'/>
                 <section>
                    <h2 className='font-bold'>
                     Duration
                    </h2>
                    <h2>2 hours</h2>
                  </section>
                </div>
                <div className='flex gap-6 items-center p-3 rounded-lg shadow'>
                    <Book className='text-green-500'/>
                    <section>
                      <h2 className='font-bold'>
                       Chapters
                      </h2>
                      <h2>2 hours</h2>
                    </section>
                </div>
                {/* <div className='flex gap-6 items-center p-3 rounded-lg shadow'>
                    <Signal className='text-red-500'/>
                    <section>
                      <h2 className='font-bold'>
                        Difficulty Level
                      </h2>
                      <h2>{course?.difficulty}</h2>
                    </section>
                </div> */}
          </div>
          {!viewCourse ? 
            <Button className={"max-w-sm"} onClick={GenerateCourseContent} disabled={loading}>
              {loading ? <Loader2Icon className='animate-spin' /> : <Settings />}Generate Content
            </Button>
           : <Link href={'/course/'+ course?.cid}><Button><PlayCircle/>Continue Learning</Button></Link>
          }
        </div>
        <Image src="https://externlabs.com/blogs/wp-content/uploads/2021/10/what-is-react-1024x724.png" alt='image' width={200} height={300}
          className='w-100 h-[240px] rounded-2xl' />
      </div>
    </>
  )
}
export default CoursesInfo