/* eslint-disable react/prop-types */

const Interests = ({handleAddInterests, removeSkill, skills, interest, setInterest}) => {
  return (
    <div className="w-full relative">
        <div className="flex items-center gap-4 font-bold mx-3 my-2">
            {skills?.map((interest, index)=><span key={index} className="flex gap-2 bg-gray-600 px-1 py-1 rounded-md">{interest}<button className="hover:bg-gray-400 hover:text-black px-1 rounded-md" onClick={()=>removeSkill(index)}>X</button></span>)}
        </div>
        <input type="text" value={interest} onChange={(e)=>setInterest(e.target.value)} className="input w-[98%] mx-3 py-8 border text-xl text-gray-100 border-gray-400 rounded-md focus:outline-none" placeholder="Enter Your Skills" />
        <button className="btn btn-success border text-white border-gray-400 px-12 text-xl font-bold absolute right-6 bottom-2" onClick={handleAddInterests}>Add</button>
    </div>
  )
}

export default Interests