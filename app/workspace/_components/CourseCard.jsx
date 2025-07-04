import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Book , LoaderCircle, PlayCircle, Settings } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'
import { toast } from 'sonner';

function CourseCard({course}) {
    const CourseJson = course?.courseJson?.course;
    const [loading, setLoading] = useState(false);

    const onEnrollCourse = async ()=> {
            try{
             setLoading(true)
             const result = await axios.post('/api/enroll-course', {
                 courseId: course?.cid,
             });
             console.log(result.data); 
             if(result.data?.resp === 'Already Enrolled'){
                toast.warning('Already Enrolled in this course')
                setLoading(false)
                return;
             }
             toast.success('Enrolled Successfully!')
             setLoading(false)

            }
            catch(e){
            console.error('Enroll error:', e);
            toast.error('Server side error')
            setLoading(false);
            }
            

    }
  return (
    <div className='shadow rounded-2xl'>
        <Image src={course?.bannerImageUrl} alt='image' width={400} height={300} className='w-full aspect-video rounded-t-xl object-cover'/>
    
      <div className='p-3 flex flex-col gap-3'>
        <h2 className='font-bold text-lg'>{CourseJson?.name}</h2>
        <p className='line-clamp-3 text-gray-400'>{CourseJson?.description}</p>
        <div className='flex justify-between items-center'>
            <h2 className='flex items-center text-sm gap-3'><Book className='text-primary h-5 w-5'/>{CourseJson?.noofChapters} Chapters</h2>
            {course?.courseContent?.length ? 
            <Button size={'sm'} 
              onClick={onEnrollCourse} 
              disabled={loading}
            > {loading ? <LoaderCircle className='animate-spin'/>:<PlayCircle/>} Enroll Course </Button> :
            <Link href={'/workspace/edit-course/'+course?.cid}><Button size={'sm'} variant='oultine'><Settings/>Generate Course</Button></Link>}
        </div>
      </div>
    </div>
  )
}

export default CourseCard