import PageBody from "components/layout/PageBody";
import PageDescription from "components/layout/PageDescription";


const descriptionBody: string = " Select the architecture you would like to edit, delete, or convert to a model or start from scratch with a new architecture"
function Architecture() {
    return <PageBody topleft={<PageDescription title="Architecture" body={descriptionBody} />} topright={undefined} bottomleft={undefined} bottomright={undefined} />
}

export default Architecture;
