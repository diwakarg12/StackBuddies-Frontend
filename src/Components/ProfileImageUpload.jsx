/* eslint-disable react/prop-types */

const ProfileImageUpload = ({handleImageChange, image}) => {

  return (
    <div className="flex h-44 w-44 flex-col justify-center items-center mb-2">
      {/* The wrapper div with Tailwind classes */}
      <div className="relative w-44 h-44">
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full rounded-full" 
        />
        
        {/* Display image or default placeholder */}
        <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-gray-300">
          {image ? (
            <img 
              src={image} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-white font-bold">
              Upload
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileImageUpload;
