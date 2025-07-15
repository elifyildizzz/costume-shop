import React from 'react';
import { useParams } from 'react-router-dom';

const CostumeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <div className="container">
      <h1>Kostüm Detayı</h1>
      <p>Kostüm ID: {id}</p>
    </div>
  );
};

export { CostumeDetail };
