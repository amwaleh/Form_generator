import React from "react";
import fields from "./fields.json";
import Field from "./form";
import Grid from "@material-ui/core/Grid";
export default function App() {

  return (
    <div className="App" container  >
     
      <Grid component={"form"} container justify="center" >

        <Grid xs={7} container spacing={3}>
          <Grid xs={12}><h3>Create Work Order </h3></Grid>
          {fields.data.fields.map(x => {
            const isNotAField = [
              "Section Break",
              "Column Break",
              "Section Break"
            ];
            if (isNotAField.includes(x.fieldtype)) return null;
            return (
              <Grid item xs={12} md={6}>
                <Field field={x} />{" "}
              </Grid>
            );
          })}
        </Grid>
      </Grid>
     
    </div>
  );
}
