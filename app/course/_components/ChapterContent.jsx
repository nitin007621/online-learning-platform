import { Button } from '@/components/ui/button';
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';
import axios from 'axios';
import { CheckCircle, Loader2Icon, X } from 'lucide-react';
import { set } from 'mongoose';
import { useParams } from 'next/navigation';
import React, { useContext, useState } from 'react'
import YouTube from 'react-youtube';
import { toast } from 'sonner';


function ChapterContent({ courseInfo , refreshData }) {
    const {courseId} = useParams();
    const {courses, enrollCourse} = courseInfo;
    const courseContent = courseInfo?.courses?.courseContent;
    const {selectedChapterIndexContext, setSelectedChapterIndexContext} = useContext(SelectedChapterIndexContext);
    const videoData = courseContent?.[selectedChapterIndexContext]?.youtubeVideo;
    const topics = courseContent?.[selectedChapterIndexContext]?.courseData?.topics;
    const [loading, setLoading] = useState(false);
    let completedChapter = enrollCourse?.completedChapter ?? [];

    const markChapterCompleted = async () => {
        setLoading(true);
        completedChapter.push(selectedChapterIndexContext);
        const result = await axios.put('/api/enroll-course', {
          courseId: courseId,
          completedChapter: completedChapter
        });
        console.log(result);
        refreshData();
        toast.success('Chapter completed!');
        setLoading(false);
    };

    const markChapterInCompleted = async () => {
        setLoading(true);
        const completedChap = completedChapter.filter(item=>item!=selectedChapterIndexContext);
        const result = await axios.put('/api/enroll-course', {
          courseId: courseId,
          completedChapter: completedChap
        });
        console.log(result);
        refreshData();
        toast.success('Chapter Incompleted!');
        setLoading(false);
    };


  return (
    <div className='p-10'>
        <div className='flex justify-between items-center'>
            <h2 className='text-2xl font-bold'>{selectedChapterIndexContext + 1}.{courseContent?.[selectedChapterIndexContext]?.courseData?.chapterName}</h2>
            {!completedChapter?.includes(selectedChapterIndexContext) ? <Button onClick={()=>markChapterCompleted()} disabled={loading}>
              {loading ? <Loader2Icon className='animate-spin'/> : <CheckCircle />}
              Mark as Completed</Button>
             : <Button variant="outline" onClick={()=>markChapterInCompleted()} disabled={loading}>{loading ? <Loader2Icon className='animate-spin'/> : <X />} Mark Incomplete</Button>}
        </div>
        <h2 className='my-2 text-xl font-bold'>Related videos 🎥</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          {videoData?.map((video, index) => index < 2 && (
            <div key={index}>
              <YouTube
                videoId={video?.videoId}
                opts={{
                  height: '280',
                  width: '500',
                }}
              />
            </div>
          ))}
        </div>
        <div className='mt-7'>
          {topics?.map((topic, index) => (
            <div key={index} className='mt-10 p-5 bg-secondary rounded-2xl shadow-lg'>
              <h2 className=' my-1  font-bold text-2xl'>{topic?.topic}</h2>
              <div dangerouslySetInnerHTML={{ __html: topic?.content }} style={{ lineHeight: '2.5' }}></div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default ChapterContent