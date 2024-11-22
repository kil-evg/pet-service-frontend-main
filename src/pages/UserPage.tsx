import React from 'react';
import myProfileImage from '../asets/images/profile-logo.png';


const UserPage: React.FC = () => {
  return (
    <div>
      <div>
        <h1 className='text-xxl text-center mb-8 mt-8'>My Profile</h1>
      </div>
      <div className='grid md:grid-cols-4 sm:grid-cols-1 '>
        <div className="rounded-full md:col-start-2 sm:grid-cols-1 place-items-center">
          <img src={myProfileImage} alt="Logo" className=' w-40 ' />
          <p>
          <span className="fa fa-star checked"></span>
<span className="fa fa-star checked"></span>
<span className="fa fa-star checked"></span>
<span className="fa fa-star"></span>
<span className="fa fa-star"></span>
          </p>
        </div>

        <div className='place-items-center  md:place-items-start mt-4 text-sm'>
          <div><strong>First name:</strong> Robindronade</div>
          <div><strong>Last name:</strong> Berabidjao</div>
          <div><strong>Email:</strong> robindrojao@gmail.com</div>
          <div><strong>Password:</strong> *****52</div>
          <div><strong>Role:</strong> Sitter</div>
          <button className='bg-sky-200 hover:text-white hover:bg-theme-blue px-2 py-1 rounded-sm '>Edit profile</button>
        </div>

        <div className=' sm:col-start-1 md:col-start-2 md:col-span-2 m-10  '>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
          and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </div>


      </div>
    </div>
  );
};

export default UserPage;
