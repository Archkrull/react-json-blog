import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { MDBRow, MDBCol, MDBContainer, MDBTypography } from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import Blogs from '../components/Blogs';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
  loadBlogData();
}, []);

const loadBlogData = async () => {
  const res = await axios.get('http://localhost:5000/blogs');
  if(res.status === 200) {
    setData(res.data);
  } else {
    toast.error('Something went wrong');
  }
}

const handleDelete = async (id) => {
  if(window.confirm('Are you sure you want to delete?')) {
    const res = await axios.delete(`http://localhost:5000/blogs/${id}`);
  if(res.status === 200) {
    toast.success('Blog deleted');
    loadBlogData();
  } else {
    toast.error('Something went wrong');
  }
  }
}

const excerpt = (str) => {
if(str.length > 50) {
  str = str.substring(0, 50) + " ... ";
}
return str
}

  return (
    <>
    <MDBRow>
    {data.length === 0 && (
        <MDBTypography className='text-center mb-0' tag='h2'>
          No Blog Found
        </MDBTypography>
      )}

      <MDBCol>
<MDBContainer>
  <MDBRow>
    {data && data.map((item, index) => (
      <Blogs
      key={index}
      {...item}
      excerpt={excerpt}
      handleDelete={handleDelete}></Blogs>
    ))}
  </MDBRow>
</MDBContainer>
      </MDBCol>
       </MDBRow>
    </>
  )
}

export default Home