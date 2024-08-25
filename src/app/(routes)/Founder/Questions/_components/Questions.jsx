"use client";
import { useState } from "react";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Button } from './../../../../../components/ui/button';
import { InputLabel } from "@mui/material";
import {db} from './../../../../../../utils/db'
import { Qualities } from './../../../../../../utils/schema'; // Adjust the path accordingly

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
  const [selectedValues, setSelectedValues] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedValues(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleClick = async () => {
    const selectedQuality = {
      technical_skill: selectedValues.find((value) => params.question.includes('technical skill')) || '',
      area_of_experience: selectedValues.find((value) => params.question.includes('area')) || '',
      leadership_style: selectedValues.find((value) => params.question.includes('leadership style')) || '',
      communication_skill: selectedValues.find((value) => params.question.includes('communication skill')) || '',
      focus: selectedValues.find((value) => params.question.includes('focus')) || '',
      work_ethic: selectedValues.find((value) => params.question.includes('work ethic')) || '',
      fundraising_skill: selectedValues.find((value) => params.question.includes('fundraising')) || '',
      problem_solving_approach: selectedValues.find((value) => params.question.includes('problem-solving')) || '',
      role_preference: selectedValues.find((value) => params.question.includes('technical skills or business acumen')) || '',
      decision_making_style: selectedValues.find((value) => params.question.includes('decision-making')) || '',
      preferred_techstack: [], // This is an example, adjust according to your logic
    };

    // Post data to the database
    try {
      await db.insert(Qualities).values(selectedQuality);
      console.log('Data successfully posted');
    } catch (error) {
      console.error('Error posting data:', error);
    }

    onNext(selectedValues);
    setSelectedValues([]); // Clear selected values for the next question
  };

  return (
    <>
      <FormControl className="bg-white" sx={{ m: 1, width: 500 }}>
        <InputLabel>Choose</InputLabel>
        <Select
          multiple
          value={selectedValues}
          onChange={handleChange}
          input={<OutlinedInput label={params.question} />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip className="text-black bg-lime-300" key={value} label={value} />
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
        {isLast ? (
          <a href='/Founder/Profile/Ideas'>
            <Button variant="outline" sx={{ mt: 2 }} onClick={handleClick}>
              Submit
            </Button>
          </a>
        ) : (
          <Button variant="outline" sx={{ mt: 2 }} onClick={handleClick}>
            Next
          </Button>
        )}
      </div>
    </>
  );
}
