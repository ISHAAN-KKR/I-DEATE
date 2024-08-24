"use client";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Button } from "@/components/ui/button";
import { InputLabel } from "@mui/material";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(option, selectedOptions, theme) {
  return {
    fontWeight:
      selectedOptions.indexOf(option) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({ params, onNext, isLast }) {
  const theme = useTheme();
  const [selectedValues, setSelectedValues] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedValues(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleClick = () => {
    onNext(selectedValues);
    setSelectedValues([]); // Clear selected values for the next question
  };

  return (
    <>
   
    <FormControl className="bg-white" sx={{ m: 1, width: 500 }}>
      <InputLabel className="">Choose</InputLabel>
      <Select
        multiple
        value={selectedValues}
        onChange={handleChange}
        input={<OutlinedInput label={params.question} />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip className="text-black bg-lime-300 " key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {params.options.map((option) => (
          <MenuItem
            key={option}
            value={option}
            style={getStyles(option, selectedValues, theme)}
          >
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <div className="flex my-4">
{
    isLast?
    <>
    <a href='/Founder/Profile'>

   
    <Button variant="outline" sx={{ mt: 2 }} onClick={handleClick}>
        Submit
      </Button>
      </a>
    </>
    :
    <>
    
    <Button variant="outline" sx={{ mt: 2 }} onClick={handleClick}>
        Next
      </Button>
    </>
}
    </div>
      </>
  );
}
