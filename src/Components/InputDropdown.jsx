/* eslint-disable react/prop-types */

const InputDropdown = ({label, value, onChange, name, options}) => {
  return (
    <div>
        <label htmlFor={name} className='block text-sm font-medium text-gray-700'>
		    {label}
		</label>
        <input 
            type="text" 
            id={name} 
            name={name} 
            required
            value={value} 
            onChange={onChange} 
            list={name}
            className="bg-white text-black appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm" 
        />
        <datalist id={name}>
          {
            options?.map(option =>(
                <option key={option} value={option} />
            ))
          }
        </datalist>
    </div>
  )
}

export default InputDropdown