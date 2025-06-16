"use client";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import CourseCard from '../_components/CourseCard';
import { Skeleton } from '@/components/ui/skeleton';


function ExploreCourses() {
    const[courseList, setCourseList] = useState([]);
    const {user} = useUser();
    useEffect(()=> {
        user && GetCourseList();
    },[user])

    const GetCourseList = async()=>{
        const result = await axios.get('/api/courses?courseId=0');
        console.log(result.data);
        setCourseList(result.data)
    }
  return (
    <div>
        <h2 className='text-3xl font-bold mb-7'>Explore courses</h2>
        <div className='flex gap-5 max-w-3xl'>
            <Input placeholder="Search courses..." />
            <Button><Search />Search</Button>
        </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-8'>
                {courseList?.map((course,index)=>(
                    <CourseCard course={course} key={index} refreshData = {GetCourseList} />
                ))}
                
            </div>
            
    </div>
  )
}

export default ExploreCourses