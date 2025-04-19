import PageBody from "components/layout/PageBody";
import PageDescription from "components/layout/PageDescription";
import PageEntryInfo from "components/layout/PageEntryInfo";
import PageItemSelection from "components/layout/PageItemSelection";
import { useEffect, useState } from "react";
import { CheckApi } from "utils/API-utils";


const descriptionBody: string = " Select the model you would like to train or delete"
function Models() {
    const [itemSelectionData, setItemSelectionData] = useState(null)

    useEffect(() => {
        async function getArchitectures() {
            await CheckApi.getAvailableModels().then((data) => { setItemSelectionData(data) })
        }
        getArchitectures();
    }, [])

    const [selectedEntry, setSelectedEntry] = useState(null);

    function getSelectedEntry(data: any) {
        setSelectedEntry(data);
    }

    return <PageBody
        topleft={<PageDescription title="Models" body={descriptionBody} />}
        topright={<PageItemSelection itemSelectionData={itemSelectionData} getSelectedEntry={getSelectedEntry} />}
        bottom={<PageEntryInfo selectedEntry={selectedEntry} type="model" />}
    />
}


export default Models;
