import PageBody from "components/layout/PageBody";
import PageDescription from "components/layout/PageDescription";
import PageItemSelection from "components/layout/PageItemSelection";
import { useEffect, useState } from "react";
import { CheckApi } from "utils/API-utils";


const descriptionBody: string = " Select the architecture you would like to edit, delete, or convert to a model or start from scratch with a new architecture"
function Architecture() {
    const [itemSelectionData, setItemSelectionData] = useState(null)

    useEffect(() => {
        async function getArchitectures() {
            await CheckApi.getAvailableArchitectures().then((data) => { setItemSelectionData(data) })
        }
        getArchitectures();
    }, [])

    return <PageBody
        topleft={<PageDescription title="Architecture" body={descriptionBody} />}
        topright={<PageItemSelection itemSelectionData={itemSelectionData} />}
        bottomleft={undefined}
        bottomright={undefined}
    />
}


export default Architecture;
