import React from 'react';
import { Helmet } from 'react-helmet';

const HelmetComponent: React.FC = () => {
  return (
    <div>
      <Helmet>
        <title>My Helmet App</title>
        <meta name="description" content="A React Helmet Example" />
      </Helmet>
    </div>
  );
};

export default HelmetComponent;
