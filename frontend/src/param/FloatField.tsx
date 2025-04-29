import { TextField } from "@mui/material";
import { FieldComponent } from "./types";

export const FloatField: FieldComponent<number> = ({ label, value, onChange }) => {
    return (
        <TextField
            label={label}
            value={value}
            onChange={(evt) => onChange(parseFloat(evt.target.value))}
            type="number"
            size="small"
        />
    );
};
