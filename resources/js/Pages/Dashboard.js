import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Page,
    Tabs,
    Layout,
    Grid,
    FormLayout,
    Box,
    LegacyCard,
    Select,
    Divider,
    DropZone,
    LegacyStack,
    Thumbnail,
    TextField,
    ChoiceList,
    Scrollable,
    Text,
    Spinner,
    Button,
    Toast,
    ButtonGroup,
    Icon
} from '@shopify/polaris';
import {
    fetchMethod
} from './helper';

//Initial State object define and declare.
const initConfigData = {
}

//Function component start.
const Dashboard = (props = {}) => {
    const { shopid = '' } = props;
    const location = useLocation();
    //Initialize and declare state
    const [configData, setConfigData] = useState(initConfigData);
    const [loader, setLoader] = useState(false);
    const [tabSelected, setTabSelected] = useState(0);
    const [collectionList, setCollectionList] = useState([]);
    const [collectionLoader, setCollectionLoader] = useState(true);
    const [fileLogo, setFileLogo] = useState([]);
    const [fileFrontImage, setFileFrontImage] = useState([]);
    const [fileBackImage, setFileBackImage] = useState([]);
    const [btnSpinner, setBtnSpinner] = useState(false);
    const [activeToastError, setActiveToastError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [activeToastSuccess, setActiveToastSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState();

    //Toast error message component.
    const toastError = activeToastError ? (
        <Toast content={errorMessage} error duration={3000} onDismiss={() => setActiveToastError(false)} />
    ) : null;

    //Toast success message component.
    const toastSaveData = activeToastSuccess ? (
        <Toast content={successMessage} duration={3000} onDismiss={() => setActiveToastSuccess(false)} />
    ) : null;

    //Handle save button event.
    const handleClick = async (e) => {

    }

    //Handle input change event for choose list component.
    const handleChooseConfigData = (field) => (value) => {
        const convertValue = Array.isArray(value) ? convertArrToStr(value) : value;
        setConfigData((prevState) => ({
            ...prevState,
            [field]: convertValue,
        }));
    }

    //Handle input change event.
    const handleConfigData = (value, field) => {
        const convertValue = Array.isArray(value) ? convertArrToStr(value) : value;
        setConfigData({
            ...configData,
            [field]: convertValue,
        });
    }

    return (
        <div className="catalog_container">
            {loader && <Spinner accessibilityLabel="Small spinner example" size="large" />}
            <Page
                // fullWidth
                title="Dashboard"
                subtitle="Here's a list of the different catalogs you've created."
                primaryAction={tabSelected === 2 && <Button variant="primary" size="large" onClick={(e) => handleClick(e)} loading={btnSpinner}>Save & Generate PDF</Button>}
            >
                <Layout>
                    <Layout.Section>
                        <div className="tab_area">
                            {toastError}
                            {toastSaveData}
                            {/* Add your html code here */}
                        </div>
                    </Layout.Section>
                </Layout>
            </Page>
        </div>
    );
}

export default Dashboard;
//Function component end.