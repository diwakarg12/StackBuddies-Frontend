/* eslint-disable react/prop-types */

const InputTextarea = ({label, value, onChange, name, row}) => {
  return (
    <div>
        <label htmlFor={name} className='block text-sm font-medium text-gray-700'>
			{label}
		</label>
		<div className='mt-1'>
			<textarea
				id={name}
				name={name}
				rows={row}
				value={value}
				onChange={onChange}
				className='bg-white text-black appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm'
			/>
		</div>
    </div>
  )
}

export default InputTextarea