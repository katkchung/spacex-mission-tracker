import { Link } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import backgroundSky from "../../imgs/plane_sky.jpg";
import { SvgIcon } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const styles = () => {
  return {
    skyBackground: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundImage: `url(${backgroundSky})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    },
    textDiv: {
      borderRadius: "25px",
      backgroundColor: "rgba(255, 255, 255, 0.4)",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      width: "65%",
      height: "25%",
    },
    links: {
      textTransform: "none" as const,
      color: "#000",
      textDecoration: "underline 0.1em rgba(0, 0, 0, 0)",
      textUnderlineOffset: "6px",
      transition: "text-decoration-color 1000ms, text-underline-offset 1000ms",
      "&:hover": {
        textDecorationColor: "rgba(0,0,0,1)",
      },
    },
  };
};

const useStyles = makeStyles(styles);

const Homepage = () => {
  const classes = useStyles();
  return (
    <div className={classes.skyBackground}>
      <div className={classes.textDiv}>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          spacing="space-between"
        >
          <Grid
            container
            item
            xs={12}
            justifyContent="center"
            sx={{ pb: "20px" }}
          >
            <Typography variant="h2" sx={{}}>
              SpaceX Missions
            </Typography>
          </Grid>
          <Grid
            container
            alignContent="center"
            justifyContent="center"
            item
            sx={{ transform: "translate(150px)" }}
          >
            <Link
              to="/missions"
              data-testid="link-to-missions-page"
              className={classes.links}
            >
              <Grid container>
                <Grid item>
                  <Typography variant="h5" sx={{ fontStyle: "italic" }}>
                    Let's explore
                  </Typography>
                </Grid>
                <Grid item>
                  <SvgIcon component={ArrowRightAltIcon} sx={{ mt: "4px" }} />
                </Grid>
              </Grid>
            </Link>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Homepage;
