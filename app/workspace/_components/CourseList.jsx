"use client";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import AddNewCourse from './AddNewCourse';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import CourseCard from './CourseCard';

function CourseList() {
    const[courseList, setCourseList] = useState([]);
    const {user} = useUser();
    useEffect(()=> {
        user && GetCourseList();
    },[user])

    const GetCourseList = async()=>{
        const result = await axios.get('/api/courses');
        console.log(result.data);
        setCourseList(result.data)
    }

  return (
    <div className='mt-10'>
        <h2 className='font-bold text-3xl'>Course List</h2>

        {courseList.length == 0 ? 
        <div className='p-7 flex flex-col items-center justify-center h-96'>
            <Image src={'/online image.png'} alt='img' width={80} height={80}/>
            <h2 className='my-2 text-lg font-bold'>Look Like you haven't created any courses yet</h2>
            <AddNewCourse>
                <Button>+ Create your First Course</Button>
            </AddNewCourse>
        </div>:
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
                {courseList?.map((course,index)=>(
                    <CourseCard course={course} key={index} refreshData = {GetCourseList} />
                ))}
            </div>
            }
    </div>
  )
}

export default CourseList