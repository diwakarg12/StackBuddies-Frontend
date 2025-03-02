/* eslint-disable react/prop-types */

const InputField = ({label, inputType, placeholder, isDisable, value, onChange, name}) => {
  return (
    <fieldset className="fieldset w-[48%]">
        
        <legend className="fieldset-legend text-white text-xl font-medium mx-2">{label}</legend>
        <input type={inputType} value={value} name={name} onChange={onChange} readOnly={isDisable} className="input border text-xl focus:outline-none text-gray-100 border-gray-400 rounded-md w-full" placeholder={placeholder} />
    </fieldset>
  )
}

export default InputField