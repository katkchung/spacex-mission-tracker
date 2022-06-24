import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { client } from "./ApolloClient/client";
import { ApolloProvider } from "@apollo/client";
import Homepage from "./components/homepage/Homepage";
import MissionsList from "./components/MissionsPage/MissionsList";
import MissionDetails from "./components/MissionsPage/MissionDetails";

const theme = createTheme({
  typography: {
    fontFamily: "Raleway , sans-serif",
  },
});
function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/missions" element={<MissionsList />}>
              <Route path=":missionId" element={<MissionDetails />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}
export default App;
