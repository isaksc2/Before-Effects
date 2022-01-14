import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const styles = (theme) => ({
  parentDiv: {
    display: "grid",
    gridTemplateColumns: "1fr",
    padding: "0px", // 50
    backgroundColor: "rgba(0,0,0,0.5)",
    gridRowStart: 1,
    gridColumnStart: 1,
  },
  childDiv: {
    gridColumn: 1,
    gridRow: 1,
  },
  image: {
    width: 200,
  },
});

class Thumbnail extends Component {
  onClick = () => {};

  vID2image = (vID) => {
    return "http://img.youtube.com/vi/" + vID + "/maxresdefault.jpg";
  };
  render() {
    const { classes } = this.props;
    return (
      <Link
        to={
          "/user/" +
          this.props.uid +
          "/" +
          this.props.postID +
          "/" +
          this.props.username +
          "/" +
          this.props.title +
          "/" +
          this.props.vID1 +
          "/" +
          this.props.vID2
        }
      >
        <div onClick={this.onClick}>
          <h1>{this.props.title}</h1>
          <div className={classes.parentDiv}>
            <div className={classes.childDiv}>
              <img alt={"Thumbnail 1"} src={this.vID2image(this.props.vID1)} className={classes.image} />
            </div>
            <div
              className={classes.childDiv}
              style={{
                clipPath: "polygon(50% 0%, 50% 100%, 100% 100%, 100% 0%)",
              }}
            >
              <img alt={"Thumbnail 2"} src={this.vID2image(this.props.vID2)} className={classes.image} />
            </div>
          </div>
        </div>
      </Link>
    );
  }
}
export default withStyles(styles)(Thumbnail);
