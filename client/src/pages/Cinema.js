import React from 'react';
import '../Styles/reUseStyle.css'

import SelectionCategoreNavigation from "../components/SelectionCategoryNavigation/SelectionCategoreNavigation";
import SelectionContentList from "../components/SelectionContetntList/SelectionContentList";

const Cinema = () => {

    return (
        <div>
            <SelectionCategoreNavigation/>
            <SelectionContentList/>
        </div>
    );
};

export default Cinema;