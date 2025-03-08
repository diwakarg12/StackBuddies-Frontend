/* eslint-disable no-unused-vars */
import { useState } from "react"
import ProfileImageUpload from "../Components/ProfileImageUpload"
import InputField from "../Components/InputField"
import Interests from "../Components/Interests"
import axios from "axios"
import { BASE_URL } from "../Components/Constants"
import { useSelector, useDispatch } from "react-redux"
import { addUser } from "../Utils/userSlice"
import { useNavigate } from "react-router-dom"

const Profile = () => {
  const user = useSelector(store => store.user)
  const [update, setUpdate] = useState(user)
  const [error, setError] = useState("")
  const [image, setImage] = useState(user.profileUrl);
  const [skill, setSkill] = useState(user.skills || []);
  const [interest, setInterest] = useState("")
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("user", update)

  const handleChange = (e) => {
    const {name, value} = e.target;

    setUpdate(prevData =>({
      ...prevData,
      [name]: value,
    }))
  };
  console.log(update);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        setImage(imageUrl);
        setUpdate(prevData =>({
          ...prevData,
          profileUrl: imageUrl
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddInterests = () => {
  setSkill(prevSkills => {
    const updatedSkills = [...prevSkills, interest];
    setUpdate(prevData => ({
      ...prevData,
      skills: updatedSkills,
    }));
    setInterest("");
    return updatedSkills;
  });
};
  const removeSkill = (index) => {
    const updatdSkills = skill.filter((_, skillIndex)=>skillIndex !== index);
    setSkill(updatdSkills);
    setUpdate(prevData => ({
    ...prevData,
    skills: updatdSkills,
  }));
  }
  const handleUpdate = async() => {
    setLoading(true);
    try {
      const {email, password, _id, __v, updatedAt, createdAt, ...updatableData} = update;
      const res = await axios.patch(BASE_URL+'/profile/edit', updatableData, {withCredentials: true});
      console.log('Updated Data', res.data.user);
      dispatch(addUser(res.data.user))
      setTimeout(()=>{
        setLoading(false);
        navigate('/');
      }, 1000)
      
    } catch (error) {
      setError(`Error: ${error.message}`)
    }
  }
  return (
     <>
     {
      loading ? (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <span className="loading loading-bars loading-xl"></span>
          <div className="toast toast-top toast-center">
            <div className="alert alert-success text-white font-medium">
              <span>Login Successfully, Please Update Your Profile Now.</span>
            </div>
          </div>
        </div>
      ):(
        <div className="p-10">
        <div className="justify-center flex items-center">
            <ProfileImageUpload handleImageChange={handleImageChange} image={image} />
        </div>
        <div className="flex flex-wrap gap-5 py-6 items-center justify-center mx-24">
                <InputField label={'FirstName'} name={"firstName"} value={update.firstName} onChange={handleChange} isDisable={false} placeholder={'Enter Your FirstName'} inputType={'text'} />
                <InputField label={'LastName'} name={"lastName"} value={update.lastName} onChange={handleChange} isDisable={false} placeholder={'Enter Your LastName'} inputType={'text'} />
                <InputField label={'Email'} name={"email"} value={update.email} onChange={handleChange} isDisable={true} placeholder={'Enter Your Email'} inputType={'enail'} />
                <InputField label={'Password'} name={"password"} value={update.password} onChange={handleChange} isDisable={true} placeholder={'Enter Your Password'} inputType={'password'} />
                <InputField label={'Age'} name={"age"} value={update.age} onChange={handleChange} isDisable={false} placeholder={'Enter Your Age'} inputType={'number'} />
                <div className="w-[48%]">
                    <label htmlFor="gender" className="text-white text-xl font-medium mx-3">Gender</label>
                    <input type="text" name="gender" value={update.gender} onChange={handleChange} className="input border text-xl text-gray-100 border-gray-400 rounded-md w-full" placeholder="Which browser do you use" id="gender" list="browsers"/>
                    <datalist id="browsers">
                        <option value="male" />
                        <option value="female" />
                        <option value="Other" />
                    </datalist>
                </div>
                <div className="flex flex-col w-[98%]">
                    <label htmlFor="about" className="text-white text-xl font-medium mx-3">About</label>
                    <textarea name="about" value={update.about} onChange={handleChange} id="about" rows={4} placeholder="About Yourself" className="bg-base-100 w-full p-3 border text-xl text-gray-100 border-gray-400 rounded-md"></textarea>
                </div>
                <Interests name="skills" skills={skill} value={update.skills} handleAddInterests={handleAddInterests} onChange={handleChange} removeSkill={removeSkill} interest={interest} setInterest={setInterest} />
                
                <button onClick={handleUpdate} className="w-[98%] btn btn-success font-medium text-xl text-white mx-28">Update Profile</button>
            </div>
            {error && <p className="font-medium text-xl text-red-700 mx-28">{error}</p>}
    </div>
      )
     }
     </>
  )
}

export default Profile