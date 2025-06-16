"use client";
import AppHeader from '@/app/workspace/_components/AppHeader'
import React, { useState,useEffect } from 'react'
import ChapterListSidebar from '../_components/ChapterListSidebar'
import ChapterContent from '../_components/ChapterContent'
import { useParams } from 'next/navigation';
import axios from 'axios';

function Course() {
  const {courseId} = useParams();
  const[courseInfo, setCourseInfo] = useState({});
  useEffect(() => {
          GetEnrolledCourseById();
      }, [])
  
      const GetEnrolledCourseById = async() =>{
          try{
              const result = await axios.get('/api/enroll-course?courseId=' + courseId);
              console.log(result.data);
              setCourseInfo(result.data);
          } catch(e){
              console.error('Error fetching enrolled courses:', e);
          }
      }
  return (
    <div>
      <AppHeader hideSidebar={true}/>

      <div className='flex flex-col md:flex-row gap-5 p-5'>
        <ChapterListSidebar courseInfo={courseInfo}/>
        <ChapterContent courseInfo={courseInfo} refreshData={() => GetEnrolledCourseById()}/>
      </div>
    </div>
  )
}

export default Course;