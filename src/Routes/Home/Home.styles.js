import { styled } from "@mui/system";
import { Typography } from "@mui/material";

export function StyledLogoTitle(props) {
  return (
    <div style={{ paddingBottom: "5vw", whiteSpace: "nowrap" }}>
      <StyledImg src={props.src} alt={props.alt} />
      <StyledTitle variant="h1">{props.title}</StyledTitle>
    </div>
  );
}
const StyledTitle = styled(Typography)`
  color: #eeeeee;
  display: inline;
  text-shadow: -0.4vw 0.3vw rgba(0, 0, 0, 0.7);
`;
const StyledImg = styled("img")`
  height: 20vw;
  margin-top: 10px;
  margin-bottom: -7.3vw;
  margin-right: -5.5vw;
`;
