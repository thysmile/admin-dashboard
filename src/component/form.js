import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles, IconButton, Button } from "@material-ui/core";
import { Formik } from "formik";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Close from "@material-ui/icons/Close";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { useItemContext } from "../context/product";

const useStyles = makeStyles(() => ({
  input: {
    width: 200,
    marginTop: 10,
  },
  inputPhoto: {
    display: "none",
  },
  img: {
    width: 200,
    height: 100,
  },
  select: {
    width: 100,
    margin: 50,
  },
}));

export default function Form() {
  const { postItem } = useItemContext();
  const [itemPrice, setItemPrice] = useState(0);
  const [itemName, setItemName] = useState("");
  const [itemDes, setItemDes] = useState("");
  const [imagePreview, setImagePreview] = useState([]);
  const [type, setType] = useState("");
  const [upload, setUpload] = useState([]);
  console.log(imagePreview);
  const handleImage = (e) => {
    [...e.target.files].map((file, index) => {
      const url = URL.createObjectURL(file);
      setImagePreview((prev) => {
        const name = file.name;
        return [...prev, { url, name }];
      });
      setUpload((prev) => {
        file.url = url;
        return [...prev, file];
      });
    });
  };

  const handleClose = (imgName) => {
    const remaining = imagePreview.filter((image) => {
      return image.url !== imgName;
    });
    setImagePreview(remaining);
  };
  const classes = useStyles();
  return (
    <div>
      <Formik
        initialValues={{
          itemName: "" || itemName,
          itemPrice: "" || itemPrice,
          itemDes: "" || itemDes,
          type: "" || type,
        }}
        onSubmit={(value) =>
          postItem(value.itemName, value.itemPrice, value.itemDes, value.type)
        }
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid container direction="column">
              <TextField
                className={classes.input}
                label="Item-name"
                variant="outlined"
                name="itemName"
                value={values.itemName}
                onChange={handleChange}
              />
              <TextField
                className={classes.input}
                label="Item-price"
                variant="outlined"
                name="itemPrice"
                value={values.itemPrice}
                onChange={handleChange}
              />
              <TextField
                value={values.itemDesz}
                className={classes.input}
                label="Item-description"
                variant="outlined"
                name="itemDes"
                InputProps={{
                  multiline: true,
                }}
                onChange={handleChange}
              />
              <Select
                className={classes.select}
                labelId="type-label"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="type"
                value={values.type}
                onChange={handleChange}
              >
                <MenuItem value="">Type</MenuItem>
                <MenuItem value="t-shirt">T-shirt</MenuItem>
                <MenuItem value="shirt">Shirt</MenuItem>
                <MenuItem value="jeans">Jeans</MenuItem>
              </Select>
              {imagePreview.length > 0 && (
                <Grid align="center">
                  {imagePreview.map((image, index) => {
                    return (
                      <Grid key={index}>
                        <img src={image.url} className={classes.img} />
                        <IconButton
                          onClick={() => handleClose(image.url)}
                          style={{ position: "absolute", marginRight: "150px" }}
                        >
                          <Close />
                        </IconButton>
                      </Grid>
                    );
                  })}
                </Grid>
              )}

              <input
                accept=".jpg,.jpeg,.png"
                className={classes.inputPhoto}
                id="input"
                type="file"
                name="image"
                onChange={handleImage}
              />
              <label htmlFor="input" type="file" name="file">
                <IconButton component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </form>
        )}
      </Formik>
    </div>
  );
}
