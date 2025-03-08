/* eslint-disable react/prop-types */

const InputField = ({label, inputType, value, onChange, name}) => {
  return (
		  <div>
		  	<label htmlFor='name' className='block text-sm font-medium text-gray-700'>
		  		{label}
		  	</label>
		  	<div className='mt-1'>
		  		<input
		  			id={name}
		  			name={name}
		  			type={inputType}
		  			required
		  			value={value}
		  			onChange={onChange}
		  			className='bg-white text-black appearance-none block w-full px-3 py-2 border border-gray-300
		  			 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 
		  			sm:text-sm'
		  		/>
		  	</div>
		  </div>
  )
}

export default InputField