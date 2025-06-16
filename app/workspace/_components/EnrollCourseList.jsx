"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import EnrollCoursecard from './EnrollCoursecard';

function EnrollCourseList() {

    const [enrolledCourseList, setEnrolledCourseList] = useState([]);
    useEffect(() => {
        GetEnrolledCourse();
    }, [])

    const GetEnrolledCourse = async() =>{
        try{
            const result = await axios.get('/api/enroll-course')
            console.log(result.data);
            setEnrolledCourseList(result.data);
        } catch(e){
            console.error('Error fetching enrolled courses:', e);
        }
    }
  return enrolledCourseList?.length > 0 && (
    <div className='mt-4'>
        <h2 className='font-bold text-lg'>Continue learning the courses</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-3'>
            {enrolledCourseList.map((course, index) => (
                <EnrollCoursecard course={course?.courses} enrollCourse={course?.enrollCourse} key={index} />
            ))}
        </div>
        
    </div>
  )
}

export default EnrollCourseList