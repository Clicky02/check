import { TextField } from "@mui/material";
import { FieldComponent } from "./types";

export const IntField: FieldComponent<number> = ({ label, value, onChange }) => {
    return (
        <TextField
            label={label}
            value={value}
            onChange={(evt) => onChange(parseInt(evt.target.value))}
            type="number"
            size="small"
        />
    );
};
