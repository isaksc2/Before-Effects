import { styled } from "@mui/system";

export const OverlapParent = styled("div")`
  display: grid;
  grid-template-columns: 1fr;
  padding: 0px;
  background-color: rgba(0, 0, 0, 0.5);
  grid-row-start: 1;
  grid-column-start: 1;
`;

export const OverlapChild = styled("div")`
  grid-column: 1;
  grid-row: 1;
`;
