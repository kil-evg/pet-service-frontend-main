// src/pages/ServiceCategoryPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCategoryPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-xxl text-center mb-8 mt-8">Service Categories</h1>
      <div className="grid grid-cols-4 gap-4 text-center">
        <Link to="/services/cats" className="col-start-2">
          <div className="bg-stone-50 p-8 rounded shadow-md hover:shadow-lg cursor-pointer">
            Cats
          </div>
        </Link>
        <Link to="/services/dogs">
          <div className="bg-stone-50 p-8 rounded shadow-md hover:shadow-lg cursor-pointer">
            Dogs
          </div>
        </Link>
        <Link to="/services/birds" className="col-start-2">
          <div className="bg-stone-50 p-8 rounded shadow-md hover:shadow-lg cursor-pointer">
            Birds
          </div>
        </Link>
        <Link to="/services/rodents">
          <div className="bg-stone-50 p-8 rounded shadow-md hover:shadow-lg cursor-pointer">
            Rodents
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCategoryPage;
