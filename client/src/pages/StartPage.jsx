import React from 'react';
import PremiereList from "../components/PremiereList/PremiereList";
import VisitList from "../components/VisitList";
import '../Styles/App.css'
import BoxOfficeReceipts from "../components/BoxOfficeReceipts/BoxOfficeReceipts";

const StartPage = () => {

    return (
        <div className={'centerDiv'}>
            <PremiereList/>
            <VisitList/>
            <BoxOfficeReceipts/>
        </div>
    );
};

export default StartPage;