import { Checkbox, FormControlLabel } from "@mui/material";
import { FieldComponent } from "./types";

export const BoolField: FieldComponent<boolean> = ({ label, value, onChange }) => {
    return (
        <FormControlLabel control={<Checkbox value={value} onChange={(evt) => onChange(evt.target.checked)} />} label={label} />
    );
};
