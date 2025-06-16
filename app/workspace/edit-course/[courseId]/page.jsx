"use client"
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CoursesInfo from '../_components/CoursesInfo';
import ChaptersTopicList from '../_components/ChaptersTopicList';

function EditCourse({viewCourse = false}) {
    const {courseId} = useParams();
    const [loading,setloading] = useState(false);
    const [course, setCourse] = useState();

    useEffect(()=>{
        GetCourseInfo();
    }, [])

    const GetCourseInfo = async () => {
        setloading(true)
        const result = await axios.get('/api/courses?courseId='+courseId)
        console.log(result.data)
        setloading(false)
        setCourse(result.data)
    }
  return (
    <div>
        <CoursesInfo course ={course} viewCourse={viewCourse}/>
        <ChaptersTopicList course ={course} viewCourse={viewCourse}/>
    </div>
  )
}

export default EditCourse