import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Page,
    Button,
    Text,
    Badge,
    IndexTable,
    useIndexResourceState,
    LegacyCard,
    Spinner,
    Toast
} from '@shopify/polaris';
import TableNoRecord from './Components/TableNoRecord';
import { fetchMethod } from './helper';

const resourceName = {
    singular: 'catalog',
    plural: 'catalogs',
};

const Home = (props = {}) => {
    const { shopid = '' } = props;
    const [loader, setLoader] = useState(true);
    const [catalogList, setCatalogList] = useState([]);
    const [activeToastError, setActiveToastError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [activeToastSuccess, setActiveToastSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState();

    const navigate = useNavigate();

    //Toast error message component.
    const toastError = activeToastError ? (
        <Toast content={errorMessage} error duration={3000} onDismiss={() => setActiveToastError(false)} />
    ) : null;

    //Toast success message component.
    const toastSaveData = activeToastSuccess ? (
        <Toast content={successMessage} duration={3000} onDismiss={() => setActiveToastSuccess(false)} />
    ) : null;

    //Call the catalog collection list..
    const getCatalogCollections = async () => {
        /* const responseData = await fetchMethod('GET', 'pdfCollections/get', shopid);
        const { data: { pdfCollections = [] } = {} } = responseData;
        setCatalogList(pdfCollections);
        setLoader(false); */
    }


    useEffect(() => {
        getCatalogCollections();
    }, [])

    //Handle to delete catalog for selected records.
    const deleteSelectedRecord = async () => {

    }

    //Handle to Enabled/Disabled catalog for selected records.
    const enabledDisabledCatalog = async (status) => {

    }

    //Bulk action define for index table...
    const promotedBulkActions = [
        {
            content: 'Enabled Catalog',
            onAction: () => enabledDisabledCatalog(1),
        },
        {
            content: 'Disabled Catalog',
            onAction: () => enabledDisabledCatalog(0),
        },
        {
            content: 'Delete Catalog',
            onAction: () => deleteSelectedRecord(),
        }
    ];

    const { selectedResources, allResourcesSelected, handleSelectionChange, clearSelection } = useIndexResourceState(catalogList);

    //Define the row html for index table.........
    const rowMarkup = catalogList.map((row, index) => {
        let { id, shop_id, enabled, pdfUrl, collectionName } = row;
        pdfUrl = pdfUrl !== '' ? `${window.location.origin}/uploads/pdfFile/shop_${shop_id}/collections_${collectionName}/${pdfUrl}` : '';
        const selectedRow = selectedResources.includes(id);
        return (
            <IndexTable.Row id={id} key={id} selected={selectedRow}>
                <IndexTable.Cell>{++index}</IndexTable.Cell>
                <IndexTable.Cell>{collectionName}</IndexTable.Cell>
                <IndexTable.Cell>{enabled ? <Badge tone="success">Enabled</Badge> : <Badge tone="critical">Disabled</Badge>}</IndexTable.Cell>
                <IndexTable.Cell>
                    <div className="btn_area">
                        <Button variant="primary" onClick={() => navigate(`dashboard?id=${id}`)}>Edit</Button>
                    </div>
                </IndexTable.Cell>
            </IndexTable.Row>
        )
    });

    return (
        <Page
            fullWidth
            title="Dashboard"
            subtitle="Here's a list of the different you've created."
            primaryAction={<Button variant="primary" size="large" onClick={() => navigate('dashboard')}>Create New</Button>}
        >
            {toastError}
            {toastSaveData}
            <div className="mb_10">
                <Text variant="headingLg" as="h5">
                    Your Title
                </Text>
            </div>
            <LegacyCard>
                <div className="table_area">
                    {loader && <Spinner accessibilityLabel="Spinner example" size="large" />}
                    <IndexTable
                        // selectable={false}
                        items={catalogList}
                        resourceName={resourceName}
                        itemCount={catalogList.length}
                        promotedBulkActions={promotedBulkActions}
                        selectedItemsCount={allResourcesSelected ? 'All' : selectedResources.length}
                        onSelectionChange={handleSelectionChange}
                        emptyState={<TableNoRecord
                            emptyProps={{
                                heading: "Manage your Title",
                                message: "Please create the for your collections.",
                                // action: { content: 'Create New Catalog', url: 'dashboard' },
                                image: "https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                            }}
                        />}
                        headings={[
                            { title: 'Sr No.' },
                            { title: 'Collection Name' },
                            { title: 'Status' },
                            { title: 'Actions' }
                        ]}
                    >
                        {rowMarkup}
                    </IndexTable>
                    {/* {(!loader && catalogList.length > 0) &&
                        <div className="pagination_area">
                            <Pagination
                                hasPrevious={hasPreviousPage}
                                onPrevious={() => getCatalogCollections({ currentState: "previous" })}
                                hasNext={hasNextPage}
                                onNext={() => getCatalogCollections({ currentState: "next" })}
                            />
                        </div>
                    } */}
                </div>
            </LegacyCard>
        </Page>
    );
}

export default Home;