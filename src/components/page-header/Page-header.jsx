import React from 'react';

import './page-header.scss';
import backgroundImage from '../../assets/image.webp'; // Import the image

const PageHeader = (props) => {
    return (
        <div className="page-header" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <h2>{props.children}</h2>
        </div>
    );
}

export default PageHeader;
