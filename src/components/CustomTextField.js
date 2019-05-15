import React, { useState } from "react";

import { useField } from "@rocketseat/unform";
import { TextField } from "@material-ui/core";

function CustomTextField({ required = false, label, name, type = 'text' }) {
    const { fieldName, registerField, defaultValue } = useField(name);
    const [value, setValue] = useState(defaultValue);

    function getValue() {
        return value;
    }

    function handleChange(e) {
        setValue(e.target.value);
    }

    return (
        <>
            <TextField
                label={label}
                required={required}
                type={type}
                onChange={event => {
                    event.preventDefault();
                    handleChange(event);
                }}
                margin="none"
                fullWidth
                variant="outlined"
                ref={() => registerField({ name: fieldName, ref: getValue })}
            />
        </>
    )
}

export default CustomTextField;
