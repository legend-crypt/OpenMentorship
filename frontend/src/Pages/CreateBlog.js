import React, {useRef, useState} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import '../css/CreateBlog.css';
import axios from '../utils/axios';

export default function CreateBlog() {
    const [content, setContent] = useState('');
    const titleRef = useRef(null);
    const thumbnailRef = useRef(null);
    const accessToken = localStorage.getItem('access_token');
    const submitHandler = () => {
        const title = titleRef.current.value;
        const thumbnail = thumbnailRef.current.files[0];
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('thumbnail', thumbnail);
        axios.post('/blogs/create/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${JSON.parse(accessToken)}`
            }
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    }
  return (
    <div className='container create-blog min-h-screen'>
        <input type='text' placeholder='Title' ref={titleRef} className='title-field mr-3'/>
        <label className='mr-2'> Choose Thumnail</label>
        <input type='file' ref={thumbnailRef} placeholder='thumnail' className='tags-field'/>
        <Editor
            apiKey='vrwgc7rl7n6rimyvv3ovlq6i0yvl64jzb1jhp58pqpv5ofpf'
            init={{
                // plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image| spellcheckdialog typography | align lineheight | checklist numlist bullist indent outdent |',
                mergetags_list: [
                    { value: 'First.Name', title: 'First Name' },
                    { value: 'Email', title: 'Email' },
                ],
            }}
            initialValue="What do you have for the world today?"
            value={content}
            onEditorChange={(newContent, editor) => {
                setContent(newContent);
            }}
        />
        <button onClick={submitHandler} className='bg-blue-600 hover:bg-blue-400 text-white py-2 px-4 rounded my-6'>Post</button>
    </div>
  );
}