import {
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@material-ui/core";
import { FormikValues, useFormikContext } from "formik";
import React from "react";

const FileTextFieldWrapper = () => {
  const {
    values: { images },
    setFieldValue,
  } = useFormikContext<FormikValues>();

  const removeImage = (name: string) => {
    const newList = images.filter((item: any) => item.name !== name);
    setFieldValue("images", newList);
  };

  return (
    <div>
      {images?.length > 0 ? (
        <Grid container>
          <ImageList cols={6}>
            {images.map((item: any, index: number) => (
              <ImageListItem key={index} cols={2}>
                <img src={URL.createObjectURL(item)} alt={item.name} />
                <ImageListItemBar
                  title={item.title}
                  position="top"
                  style={{ background: "transparent" }}
                  actionIcon={
                    <IconButton
                      style={{
                        background: "black",
                        marginRight: "10px",
                        backgroundColor: "rgb(255, 68, 72)",
                      }}
                      size="small"
                      onClick={() => removeImage(item.name)}
                    >
                      <i
                        className="la la-remove"
                        style={{ color: "white" }}
                      ></i>
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
      ) : (
        <Grid
          container
          style={{
            border: "1px solid",
            borderColor: "rgba(0,0,0,.12)",
            padding: "2%",
            borderRadius: "4px",
          }}
        >
          <Grid item xs={12}>
            <Typography>Chưa có hình ảnh</Typography>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default FileTextFieldWrapper;
