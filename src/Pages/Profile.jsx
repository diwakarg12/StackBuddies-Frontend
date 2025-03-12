/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import ProfileImageUpload from "../Components/ProfileImageUpload"
import InputField from "../Components/InputField"
import Interests from "../Components/Interests"
import axios from "axios"
import { BASE_URL } from "../Components/Constants"
import { useSelector, useDispatch } from "react-redux"
import { addUser } from "../Utils/userSlice"
import { useNavigate } from "react-router-dom"
import InputDropdown from "../Components/InputDropdown"
import InputTextarea from "../Components/InputTextarea"

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
        console.log('image', image)
        setUpdate(prevData =>({
          ...prevData,
          profileUrl: image
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
      console.log('Updated Data', res?.data?.user);
      dispatch(addUser(res?.data?.user))
      setLoading(false);
      navigate('/');
    } catch (error) {
      setError(`Error: ${error}`);
      setLoading(false);
    }
  }
  return (
        <div className="p-10 min-h-screen bg-gray-100 flex flex-col">
          <div className='flex-grow flex flex-col justify-center px-4 sm:px-6 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
					    <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Your Profile</h2>
				    </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className='relative bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200 space-y-4'>
                <p className="absolute top-2 left-4 text-red-600 text-xs">Click on the Image to change the Image</p>
                {/* Image */}
                <ProfileImageUpload handleImageChange={handleImageChange} image={image} />
                {/* First Name */}
                <InputField label={'FirstName'} name={"firstName"} value={update.firstName} 
                  onChange={handleChange} inputType={'text'} 
                />
                {/* Last Name */}
                <InputField label={'LastName'} name={"lastName"} value={update.lastName} 
                  onChange={handleChange} inputType={'text'} 
                />
                {/* Age */}
                <InputField label={'Age'} name={"age"} value={update.age} onChange={handleChange}     
                  inputType={'number'} 
                />
                {/* Gender */}
                <InputDropdown label={'Gender'} name={"gender"} value={update.gender} 
                  onChange={handleChange} options={['male', 'female', 'others']}
                />
                {/* About */}
                <InputTextarea label={'About'} name={"about"} value={update.about} 
                  onChange={handleChange} row={3}  
                />
                {/* Skills */}
                <Interests name="skills" skills={skill} value={update.skills} handleAddInterests={handleAddInterests} onChange={handleChange} removeSkill={removeSkill} interest={interest} setInterest={setInterest} />
                
                <button onClick={handleUpdate} className="w-full border bg-gradient-to-br
		              from-red-500 to-pink-500 py-1 rounded font-medium text-lg text-white hover:bg-gradient-to-br hover:from-red-700 hover:to-pink-700"
                >
                  Update Profile
                </button>
                {error && <p className="border font-medium text-lg text-red-700 text-center">{error}</p>}
                </div>
                
            </div>
          </div>
        </div>
  )
}

export default Profile