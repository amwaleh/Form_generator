import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const PBPCheck = props => (
  <FormControlLabel
    name={props.fieldname}
    control={<Checkbox value="checked" />}
    label={props.label}
  />
);

const PBPSelect = props => (
  <TextField
    id="standard-select-currency"
    name={props.fieldname}
    variant="outlined"
    fullWidth
    select
    label={props.label}
    value={props.value[props.fieldname]}
    onChange={props.handleChange}
    helperText=""
  >
    {props.options.map(option => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </TextField>
);

const PBPTextField = props => (
  <TextField
    fullWidth
    value={props.value[props.fieldname]}
    variant="outlined"
    name={props.fieldname}
    placeholder={`${props.label} `}
    type={props.type}
    onChange={props.handleChange}
  />
);

const Inputfield = props => {
  const isNotAField = ["Section Break", "Column Break", "Section Break"];
  // return props.field.map(x => {
  const { fieldname, label, fieldtype, options } = props.field;
  const selectOption =
    options && options.split("\n").map(x => ({ label: x, value: x }));

  const type = getFieldType(fieldtype);
  const propsToPass = { fieldname, label, fieldtype, options };
  switch (type) {
    case "text":
      return <PBPTextField {...props} {...propsToPass}  />;
    case "select":
      return <PBPSelect {...propsToPass} {...props} options={selectOption} />;
    case "checkbox":
      return <PBPCheck {...propsToPass} {...props} />;
    default:
      return (
        <TextField
          name={fieldname}
          value={props.value[fieldname]}
          variant="outlined"
          {...propsToPass}
          fullWidth
          type={type}
        />
      );
  }
  // });
};
const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

const getFieldType = type => {
  switch (type) {
    case "Attach":
      return "File";
    case "Attach Image":
      return "image";
    case "Data":
    case "Text":
    case "Code":
      return "text";
    case "Date":
      return "date";
    case "Datetime":
      return "datetime-local";
    case "Link":
      return "url";
    case "Password":
      return "password";
    case "Float":
    case "Int":
      return "number";
    case "Check":
      return "checkbox";
    case "Select":
      return "select";
    default:
      return type;
  }
};

export default function ERPForm(props) {
  const { field, classes } = props;
  console.log(props);

  const [value, setValue] = React.useState({});
  const handleChange = event => {
    const { name, value } = event;
    setValue(prevState => ({ ...prevState, [name]: value }));
    console.log(value);
  };

  return (
    <Inputfield
      classes={classes}
      field={field}
      value={value || field.default}
      onChange={handleChange}
    />
  );
}
