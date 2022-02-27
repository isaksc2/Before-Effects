import { styled } from "@mui/system";
import { TextField } from "@mui/material";

export const UsernameField = styled(TextField)`
  color: blue;
  width: 50vw;
  font-size: 40px;

  input1: {
    color: white;
    font-size: 50;
  }
`;

export const OverlapChild = styled("div")`
  grid-column: 1;
  grid-row: 1;
`;

export const Preview = styled("img")`
  width: 200px;
`;
