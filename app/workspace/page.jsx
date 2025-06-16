import React from 'react'
import Dashboard from './_components/Dashboard'
import CourseList from './_components/CourseList'
import EnrollCourseList from './_components/EnrollCourseList'

function workspace() {
  return (
    <div>
      <Dashboard/>
      <EnrollCourseList/>
      <CourseList/>
    </div>
  )
}

export default workspace