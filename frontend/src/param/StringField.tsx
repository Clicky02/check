import { TextField } from "@mui/material";
import { FieldComponent } from "./types";

export const StringField: FieldComponent<string> = ({ label, value, onChange }) => {
    return <TextField label={label} value={value} onChange={(evt) => onChange(evt.target.value)} type="text" size="small" />;
};
