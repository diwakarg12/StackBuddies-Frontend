/* eslint-disable react/prop-types */

const Interests = ({handleAddInterests, removeSkill, skills, interest, setInterest}) => {
  return (
    <div className="w-full relative">
        <div className="flex flex-wrap items-center gap-2 font-semibold my-2">
            {skills?.map((interest, index)=><span key={index} className="flex items-center rounded-sm gap-1 bg-gray-400 pl-1.5 ">{interest}<button className="hover:bg-gray-700 hover:text-white px-1 py-0.5" onClick={()=>removeSkill(index)}>X</button></span>)}
        </div>
        <input type="text" value={interest} onChange={(e)=>setInterest(e.target.value)} className="bg-white text-black appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm" />
        <button className="text-white bg-gradient-to-br from-red-500 to-pink-500 hover:bg-gradient-to-br hover:from-red-700 hover:to-pink-700 rounded-r-md border border-gray-400 px-8 py-1 text-lg font-semibold absolute right-0 bottom-0" onClick={handleAddInterests}>Add</button>
    </div>
  )
}

export default Interests