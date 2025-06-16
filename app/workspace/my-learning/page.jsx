import React from 'react'
import Dashboard from '../_components/Dashboard'
import EnrollCourseList from '../_components/EnrollCourseList'

function MyLearning() {
  return (
    <div>
        <Dashboard/>
        <h2 className='text-3xl font-bold mt-5'>My Learning</h2>
        <EnrollCourseList/>
    </div>
  )
}

export default MyLearning