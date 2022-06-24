import { Link, Outlet } from "react-router-dom";
import {
  Autocomplete,
  Box,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import backgroundSky from "../../imgs/plane_sky.jpg";
import { useQuery } from "@apollo/client";
import { GetAllMissionsResults, GET_ALL_MISSIONS } from "./queries";
import { useState } from "react";

const styles = () => {
  return {
    links: {
      textTransform: "none" as const,
      textDecoration: "none",
    },
  };
};

const useStyles = makeStyles(styles);

const MissionsList = () => {
  const classes = useStyles();
  const [filters, setFilters] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<string>("");

  const manufacturerOptions = [
    "Orbital ATK",
    "SSL",
    "SpaceX",
    "Sierra Nevada Corporation",
    "Boeing",
  ];

  const { loading, error, data } =
    useQuery<GetAllMissionsResults>(GET_ALL_MISSIONS);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minWidth="100%"
        sx={{ pt: "24px" }}
      >
        <CircularProgress data-test-id="missions-loading" />{" "}
      </Box>
    );
  } else if (error) {
    return (
      <Typography sx={{ color: "red" }}>
        There was an error loading missions
      </Typography>
    );
  }

  if (data === null || data === undefined) {
    return null;
  }

  const filteredMissions =
    filters.length > 0
      ? data.missions.filter(
          (m) =>
            m.manufacturers.filter((company) => filters.includes(company))
              .length !== 0
        )
      : [...data.missions];

  //will have to update this into maybe a function once more sort options are available
  const sortedAndFilteredMissions =
    selectedSort === "Alphabetical"
      ? filteredMissions.sort((miss1, miss2) =>
          miss1.name.localeCompare(miss2.name)
        )
      : filteredMissions;

  return (
    <>
      <Grid container direction="row">
        <Grid item xs={12}>
          <Box
            sx={{
              py: "42px",
              px: "24px",
              backgroundImage: `url(${backgroundSky})`,
              backgroundPosition: "0px 145px",
              boxShadow: "5",
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: "500" }}>
              SpaceX Missions
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            p: "24px",
            backgroundColor: "rgba(231, 241, 242, 0.8)",
            minHeight: "100vh",
            boxShadow: "5",
          }}
        >
          <Box sx={{ pb: "16px" }}>
            <Autocomplete
              multiple
              id="mission-filter"
              data-testid={`mission-filter`}
              options={manufacturerOptions.filter(
                (option) => !filters.includes(option)
              )}
              onChange={(_, selected) => setFilters(selected)}
              value={manufacturerOptions.filter((opt) => filters.includes(opt))}
              defaultValue={[]}
              getOptionLabel={(option) => option}
              isOptionEqualToValue={(option, value) => option === value}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Filter by Manufacturer"
                />
              )}
            />
          </Box>
          <Box sx={{ pb: "16px" }}>
            <FormControl sx={{ minWidth: "100%" }}>
              <InputLabel>Sort</InputLabel>
              <Select
                id="sort-by"
                label="Sort"
                data-testid={`sort-by`}
                onChange={(event) => setSelectedSort(event.target.value)}
                value={selectedSort}
                fullWidth
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Alphabetical">Alphabetical by Name</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {sortedAndFilteredMissions &&
            sortedAndFilteredMissions.map((mission) => (
              <Box sx={{ pb: "4px" }} key={mission.id}>
                <Link to={mission.id} className={classes.links}>
                  <Typography variant="h5" sx={{ fontStyle: "600" }}>
                    {mission.name}
                  </Typography>
                </Link>
              </Box>
            ))}
        </Grid>
        <Grid item xs>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default MissionsList;
