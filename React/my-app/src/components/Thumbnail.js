import React, { Component } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    parentDiv: {
        display: "grid",
        gridTemplateColumns: "1fr",
        padding: "0px", // 50
        backgroundColor: "rgba(0,0,0,0.5)",
        gridRowStart: 1,
        gridColumnStart: 1
    },
    childDiv: {
        gridColumn: 1,
        gridRow: 1
    }
});


class Thumbnail extends Component {
    constructor(props) {
        super(props);
    }

    


    vID2image = (vID) => {
        return "https://img.youtube.com/vi/" + vID +"/default.jpg"
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <h1>{this.props.title}</h1>
                <div className={classes.parentDiv}>
                    <div className={classes.childDiv}>
                        <img src = {this.vID2image(this.props.vID1)} />
                    </div>
                    <div className={classes.childDiv} style={{ clipPath: "polygon(50% 0%, 50% 100%, 100% 100%, 100% 0%)" }} >
                    <img src = {this.vID2image(this.props.vID2)} />
                    </div>
                </div>
            </div>
        )
    }
}
export default withStyles(styles)(Thumbnail);