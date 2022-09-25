import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../auth/helper';
import { Base } from '../../core/Base';
import { createCategory } from './adminApiCall';


const AddCategory = () => {
  const [name, setName] = useState("")
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const {user, token}=isAuthenticated();
  const handleOnChange=(event)=>{
    setName(event.target.value)
    setError("");
  };
  const onSubmit =(e)=>{
    e.preventDefault(); 
    setError("");
    setSuccess(false);  
    //backend req 
    createCategory(user._id, token, {name}).then(data=>{
      if(data.error){
        setError(true)
      }else{
        setName("");
        setError("");
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
        }, 4000);
      }
    }
    ).catch(err=>(console.log(err)))
    
  }
  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left"><div className="alert alert-success"
          style={{ display: success ? "" : "none" }}

        >
          Category has been created Successfully!!

        </div>
        </div>
      </div>
    )
  }
  const errorMessage = () => {
    return (<div className="row">
      <div className="col-md-6 offset-sm-3 text-left">
        <div className="alert alert-danger"
          style={{ display: error ? "" : "none" }}

        >
          {error}
        </div>
      </div>
    </div>
    )
  }
  const goBack=()=>{
    return <div className="mt-5">
      <Link className='btn btn-sm btn-dark mb-3' to="/admin/dashboard">Admin Home</Link>
    </div>
  }
  const myCategoryForm=()=>(
    <div className="form-group">
      <p className="lead">Enter the category</p>
      <input type="text" className="form-control my-3"
      autoFocus
      onChange={handleOnChange}
      value={name}
      required
      placeholder='for ex. summer' 

      />
      <button onClick={onSubmit} className="btn btn-outline-info">Create Category</button>
    </div>
    
  )
  return (
    <Base className="container p-4 bg-info m-5"title='Create a new category here' description='Add a new category for new T-Shirts'>
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>

    </Base> 

  )
}

export default AddCategory;