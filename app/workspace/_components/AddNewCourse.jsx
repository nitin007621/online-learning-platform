import React, { useReducer } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button'
import { Loader2Icon, Sparkle } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'
import { set } from 'mongoose'
import { useRouter } from 'next/navigation'


function AddNewCourse({children}) {

    const [loading, setLoading] = useState(false);

    const [FormData, setFormData] = useState({
        name: '',
        description: '',
        Videos: '',
        chapters: '',
        category: '',
        difficulty: '',
    });

    const router = useRouter();

    const OnHandleInputChange=(field, value)=>{
        setFormData(prev=>({
            ...prev,
            [field]:value
        }));
        console.log(FormData);
    }

    const onGenerate = async () => {
        console.log(FormData);
        const courseId = uuidv4();
        try {
            setLoading(true);
            const result = await axios.post('/api/Generate-AI', {
                ...FormData,
                courseId : courseId
        });
        // console.log(result.data);
        if(result.data.resp === 'Limit exceeded')
        {
            toast.warning('Please Subscribe to Plan')
            router.push('/workspace/billing');
        }
        setLoading(false);
        router.push('/workspace/edit-course/'+result.data?.courseId);
    }
        catch(e){
            setLoading(false);
            console.log(e);

        }
    }
  return (
    <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create New Course Using AI</DialogTitle>
                <DialogDescription asChild>
                    <div>
                        <div className='flex flex-col gap-4 mb-6'>
                            <label className='text-sm font-semibold text-gray-700'>
                                Course Name
                                <Input placeholder="Course Name" onChange={(e) => OnHandleInputChange('courseName',e?.target.value)} />
                            </label>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Course Description
                            </label>
                            <Textarea
                              className="w-full font-semibold"
                              placeholder="Enter course description"
                              onChange={(e) => OnHandleInputChange('course-Description',e?.target.value)} />
                        </div>

                        <div className='mb-6'>
                            <label className='text-sm font-semibold text-gray-700 mb-7'>
                                No. of Chapters
                                <Input placeholder="Chapters"  type='number' onChange={(e) => OnHandleInputChange('chapters',e?.target.value)} />
                            </label>
                        </div>

                        <div className='mb-6'>
                            <label className='text-sm font-semibold text-gray-700 mb-7'>
                                Videos
                                <Switch onCheckedChange={()=>OnHandleInputChange('Videos',!FormData?.Videos)}/>
                            </label>
                        </div>

                        <div className='mb-6'>
                            <label className='text-sm font-semibold text-gray-700 mb-7'>
                                Difficulty Level
                                <Select OnValueChange={(value) => OnHandleInputChange('Difficulty', value)}>
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Difficulty Level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Easy">Easy</SelectItem>
                                      <SelectItem value="Medium">Medium</SelectItem>
                                      <SelectItem value="Hard">Hard</SelectItem>
                                    </SelectContent>
                                </Select>
                            </label>
                        </div>

                         <div className='flex flex-col gap-4 mb-6'>
                            <label className='text-sm font-semibold text-gray-700 mb-7'>
                                Category
                                <Input placeholder="Category"  onChange={(e) => OnHandleInputChange('Category',e?.target.value)} />
                            </label>
                        </div>

                        <div>
                            <Button className={"w-full"} onClick={onGenerate} disabled={loading}>
                                {loading?<Loader2Icon className='animate-spin'/>:
                                <Sparkle/>} Generate Course</Button>
                        </div>
                    </div>
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default AddNewCourse