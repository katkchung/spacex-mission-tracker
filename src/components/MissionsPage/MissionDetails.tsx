import { useParams } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useQuery } from "@apollo/client";
import {
  GetMissionResult,
  GetMissionVariables,
  GET_MISSION_INFO,
  Payload,
} from "./queries";

const MissionDetails = () => {
  const { missionId } = useParams();
  const { loading, error, data } = useQuery<
    GetMissionResult,
    GetMissionVariables
  >(GET_MISSION_INFO, {
    variables: {
      missionId: missionId ? missionId : "",
    },
  });

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minWidth="100%"
        sx={{ pt: "24px" }}
      >
        <CircularProgress data-testid="missions-loading" />{" "}
      </Box>
    );
  } else if (error) {
    return (
      <Typography sx={{ color: "red" }}>
        There was an error loading mission details
      </Typography>
    );
  }

  if (data === null || data === undefined) {
    return null;
  }

  const {
    id,
    name,
    description,
    manufacturers,
    twitter,
    website,
    wikipedia,
    payloads,
  } = data.mission;

  return (
    <>
      {data.mission && (
        <Grid container spacing={2} sx={{ p: "24px" }}>
          <Grid item xs={12}>
            <Typography variant="h3" sx={{ fontWeight: "600", pl: "16px" }}>
              Mission: {name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ py: "16px" }}>Description</Divider>
            <Typography variant="h6" sx={{ pl: "16px" }}>
              {description}
            </Typography>
          </Grid>
          <Divider />
          <Grid item xs={12}>
            <Divider sx={{ py: "8px" }}>Manufacturers</Divider>
            <List>
              {manufacturers.map((company) => (
                <ListItem key={`${id}-${company}`}>
                  <Typography variant="body1">{company}</Typography>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ py: "8px" }}>Payloads</Divider>
            <List>
              {payloads
                .filter((element) => element !== null)
                .map((load: Payload) => (
                  <ListItem key={load.payload_mass_lbs}>
                    <Typography variant="body1">
                      {load.payload_type}{" "}
                      {load.payload_mass_lbs
                        ? `weighing ${load.payload_mass_lbs} lbs`
                        : ""}
                    </Typography>
                  </ListItem>
                ))}
            </List>
            <Grid item xs={12}>
              <Divider sx={{ py: "8px" }}>Links</Divider>
              {website && (
                <a target="_blank" rel="noreferrer" href={website}>
                  <Typography variant="h6" sx={{ pl: "16px" }}>
                    Website
                  </Typography>
                </a>
              )}
              {twitter && (
                <a target="_blank" rel="noreferrer" href={twitter}>
                  <Typography variant="h6" sx={{ pl: "16px" }}>
                    Twitter
                  </Typography>
                </a>
              )}
              {wikipedia && (
                <a target="_blank" rel="noreferrer" href={wikipedia}>
                  <Typography variant="h6" sx={{ pl: "16px" }}>
                    Wikipedia
                  </Typography>
                </a>
              )}
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default MissionDetails;
