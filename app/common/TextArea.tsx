import React from "react";
import { TextField } from "@mui/material";

interface TextareaProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const Textarea: React.FC<TextareaProps> = ({ value, onChange, placeholder }) => {
    return (
        <TextField
            multiline
            minRows={3}
            variant="outlined"
            fullWidth
            placeholder={placeholder || "Saisissez votre justification..."}
            value={value}
            onChange={onChange}
        />
    );
};

export default Textarea;
