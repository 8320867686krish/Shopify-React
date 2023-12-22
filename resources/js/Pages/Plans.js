import React, { useState, useEffect } from 'react';
import {
    Page,
    Card,
    Grid,
    Link,
    Button,
    Layout,
    List,
    Icon,
    Spinner,
    Toast
} from '@shopify/polaris';
import { TickMinor, CancelMajor, StarFilledMinor } from '@shopify/polaris-icons';
import TableNoRecord from './Components/TableNoRecord';
import { fetchMethod } from './helper';

const displayText = {
    'false': 'No',
    'true': 'Unlimited'
}

const DisplayIcon = ({ param = 'false' }) => {
    const paramCheck = param == 'false' ? false : true;
    return (<Icon source={paramCheck ? TickMinor : CancelMajor} tone={paramCheck ? "success" : "critical"} />)
}

const Plans = (props = {}) => {
    const { shopid = '' } = props;
    const [selectedPlan, setSelectedPlan] = useState({});
    const [planList, setPlanList] = useState([]);
    const [loader, setLoader] = useState(false);
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

    //Handle plan change event..
    const handlePlan = async (e, planName) => {
        e.preventDefault();
        setPlan(planName)
        setLoader(true);
        const responseData = await fetchMethod('GET', `billing/save`, shopid);
        const { error = '', data = {} } = responseData;
        if (error !== "") {
            setErrorMessage(error);
            setActiveToastError(true);
        } else {
            setPlanList(data);
            setSuccessMessage(Success);
            setActiveToastSuccess(true);
        }
        setLoader(false);
    }

    //Get the plan list..
    const getPlanList = async () => {
        setLoader(true);
        const responseData = await fetchMethod('GET', 'plans/get', shopid);
        const { error = '', data: { plans = [], usersPlan = {} } = {} } = responseData;
        if (error !== "") {
            setErrorMessage(error);
            setActiveToastError(true);
        } else {
            setPlanList(plans);
            setSelectedPlan(usersPlan);
        }
        setLoader(false);
    }

    useEffect(() => {
        getPlanList();
    }, []);

    const { isFree = 0, plan_id = '' } = selectedPlan;

    return (
        <div className="plans_container">
            {loader && <Spinner accessibilityLabel="Small spinner example" size="large" />}
            <Page
                // fullWidth
                title="Plans"
                subtitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            >
                <Layout>
                    <Layout.Section>
                        <div className="plans_area">
                            {toastError}
                            {toastSaveData}

                            {
                                planList.length > 0
                                    ?
                                    <Grid>
                                        {planList.map(pItem => {
                                            const { id = "", name = "", price = 0.00, catelog_limit = 'false', catelog_page_limit = 'false', catelog_product_limit = 'false', layout_limit = 'false', font_limit = 'false', barcode = 'false', isAddFrontBack = 'false' } = pItem;
                                            return (
                                                <Grid.Cell key={`plan_key_${id}`} columnSpan={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
                                                    <div className="box_card">
                                                        {(id === plan_id) && <div className="active_plan"><Icon source={StarFilledMinor} tone="base" /></div>}
                                                        <Card>
                                                            <div className="free plan_card">
                                                                <h3 className="plan_title">{name}</h3>
                                                                <div className="price_area">
                                                                    <h5>${price}</h5>
                                                                    <p className="note">per month</p>
                                                                </div>
                                                                <List>
                                                                    <List.Item><DisplayIcon param={catelog_limit} />{`${displayText[catelog_limit] ?? catelog_limit} catalogs`}</List.Item>
                                                                    <List.Item><DisplayIcon param={catelog_page_limit} />{`${displayText[catelog_page_limit] ?? catelog_page_limit} pages per catalog`}</List.Item>
                                                                    <List.Item><DisplayIcon param={catelog_product_limit} />{`${displayText[catelog_product_limit] ?? catelog_product_limit} products to catalog`}</List.Item>
                                                                    <List.Item><DisplayIcon param={layout_limit} />{`${displayText[layout_limit] ?? layout_limit} product layout`}</List.Item>
                                                                    <List.Item><DisplayIcon param={font_limit} />{`${displayText[font_limit] ?? font_limit} font`}</List.Item>
                                                                    <List.Item><DisplayIcon param={barcode} />{`${displayText[barcode] ?? barcode} Barcode`}</List.Item>
                                                                    <List.Item><DisplayIcon param={isAddFrontBack} />{`${displayText[isAddFrontBack] ?? isAddFrontBack} Front/Back cover}`}</List.Item>
                                                                </List>
                                                                <p>If you don't want to add transfer. You can import your inventory from <Link url="setting">settings</Link></p>
                                                                <Button size="large" disabled={id === plan_id || name.toLowerCase() === 'free'} onClick={(e) => handlePlan(e, 'general')}>Subscribe</Button>
                                                            </div>
                                                        </Card>
                                                    </div>
                                                </Grid.Cell>
                                            )
                                        })}
                                    </Grid>
                                    :
                                    <Card>
                                        <TableNoRecord
                                            emptyProps={{
                                                heading: "No plans yet",
                                                message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                                                image: "https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                                            }}
                                        />
                                    </Card>
                            }
                        </div>
                    </Layout.Section>
                </Layout>
            </Page>
        </div>
    );
}

export default Plans;