import React, {useState} from 'react';
import { MDBValidation, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'
//m7grpjnf

const initialState = {
    title: '',
    description: '',
    category: '',
    imageUrl: ''
}

const options = ['Travel', 'Fashion', 'Fitness', 'Sports', 'Food', 'Tech']

const AddEditBlog = () => {
    const [formValue, setFormValue] = useState(initialState);
    const [categoryErrMsg, setCategoryErrMsg] = useState(null);
    const {title, description, category, imageUrl} = formValue;

    const navigate = useNavigate();

    const getDate = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //Jan is 0, therefor + 1
        let yyyy = String(today.getFullYear());
        today = mm + '/' + dd + '/' + yyyy;
        return today;

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!category){
            setCategoryErrMsg('Please select a category');
        }
        if(title && description && imageUrl && category) {
            const currentDate = getDate();
            const updatedBlogData = {...formValue, date: currentDate};
            const res = await axios.post('//localhost:5000/blogs', updatedBlogData);
            
            if(res.status === 201) {
                toast.success('Blog created successfully')
            } else {
                toast.error('Something went wrong. Try again')
            }
            setFormValue({title: '', description: '', category: '', imageUrl: ''});
            navigate('/');
        }  
    };

    const onInputChange = (e) => {
        let {name, value} = e.target;
        setFormValue({...formValue, [name]: value})
    };

    const onCategoryChange = (e) => {
        setCategoryErrMsg(null);
        setFormValue({...formValue, category: e.target.value})
    };

    const onUploadImage = (file) => {
        /* console.log('file', file); */
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'm7grpjnf');
        axios.post('http://api.cloudinary.com/v1_1/dnk6zlaph/image/upload', formData)
        .then((res) => {
            toast.info('Image uploaded successfulyl');
            setFormValue({...formValue, imageUrl: res.data.url})
        }).catch((err) => {
            toast.error('Could not upload. Something went wrong');
         });
    };

    
  return (
    <MDBValidation className='row g-3' style={{marginTop: '100px'}} noValidate onSubmit={handleSubmit}>
        <p className='fs-2 fw-bold'>Add Blog</p>
       <div style={{
        margin: 'auto',
        padding: '15px',
        maxWidth: '400px',
        alignContent: 'center'
       }}>
        <MDBInput 
        value={title || ''}
        name='title'
        type='text'
        onChange={onInputChange}
        required
        label='Title'
        style={{marginTop: '40px'}}
        validation='Please provide a title'
        invalid='true'/>

        <MDBInput 
        value={description || ''}
        name='description'
        type='text'
        textarea='true'
        rows={4}
        onChange={onInputChange}
        required
        label='Description'
        style={{marginTop: '40px', minHeight: '100px'}}
        validation='Please provide a description'
        invalid='true'/>

        <MDBInput 
        type='file'
        onChange={(e) => onUploadImage(e.target.files[0])}
        required
        aria-label='Title'
        style={{marginTop: '40px'}}
        validation='Please provide a title'
        invalid='true'/>

        <select
        className='categoryDropdown'
        onChange={onCategoryChange}
        style={{marginTop: '40px'}}
        value={category}>
            <option>Please select a category</option>
            {options.map((option, index) => (
                <option value={option || ''} key={index}>{option}</option>
            ))}
        </select>
        {categoryErrMsg && (
            <div className='categoryErrorMsg'>{categoryErrMsg}</div>
        )}
        <MDBBtn type='submit' style={{margin: '10px'}}>Add</MDBBtn>
        <MDBBtn color='danger' style={{margin: '10px'}} onClick={() => navigate('/')}>Add</MDBBtn>
        </div> 
    </MDBValidation>
  )
}

export default AddEditBlog