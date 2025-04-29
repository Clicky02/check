import { Accordion, AccordionDetails, AccordionSummary, Paper, SxProps, Theme, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { STYLE } from "utils/style";
import { NodeInfo } from "architecture/ArchStore";

type BaseNodeProps = {
    title?: string;
    children?: React.ReactNode;
    foldable?: boolean;
    selected: boolean;
};

export const BaseNode = ({ title, children: content, foldable = false, selected }: BaseNodeProps) => {
    const useAccordian = title !== undefined && content !== undefined && foldable;
    const titleEl = (
        <Typography align="center" variant="h5">
            {title}
        </Typography>
    );

    const containerStyle: SxProps<Theme> = {
        border: selected ? STYLE.activeBorder : STYLE.inactiveBorder,
        width: STYLE.nodeWidth,
    };

    if (useAccordian) {
        return (
            <Accordion variant="outlined" sx={containerStyle}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>{titleEl}</AccordionSummary>
                <AccordionDetails>{content}</AccordionDetails>
            </Accordion>
        );
    } else {
        return (
            <Paper variant="outlined" sx={containerStyle}>
                {titleEl}
                {content}
            </Paper>
        );
    }
};

export function validateNode<T extends NodeInfo>(
    node: NodeInfo | undefined,
    type: T["type"],
    create: (node: T) => [string | undefined, React.ReactNode]
): [string | undefined, React.ReactNode] {
    if (node === undefined) {
        return [undefined, <Typography>Could not find Node.</Typography>];
    } else if (node.type !== type) {
        return [undefined, <Typography>Invalid Node Type '{node.type}'.</Typography>];
    } else {
        return create(node as T);
    }
}
