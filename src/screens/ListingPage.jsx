import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { sizing } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import NavigationBar from "../components/NavigationBar.jsx";
import Listing from "../components/Listing.jsx";

const theme = createTheme();

export default function ListingPage() {
  console.log("I am in the listing page");

  //user authentication details
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  const listingDefault = [
    {
      id: 1,
      name: "Nothing Here Right Now!",
      des: "Please click the Search Button for Results (Don't press the Enter Key)",
    },
  ];
  //set default before search to prompt for search
  const [listings, setListings] = useState(listingDefault);

  //set default search to space character
  const [search, setSearch] = useState(" ");

  const [commitment, setCommitment] = useState("All");

  const handleCommitmentFilter = async (event) => {
    const value = await event.target.value;
    setCommitment(value);
  };

  React.useEffect(() => {
    //console.log(commitment);
    handleSearching();
  }, [commitment]);

  const [tag, setTag] = useState("All");

  const handleTagFilter = async (event) => {
    const value = await event.target.value;
    //console.log(value);
    setTag(value);
    //console.log(tag);
  };

  React.useEffect(() => {
    //console.log(tag);
    handleSearching();
  }, [tag]);


  const [location, setLocation] = useState("All");

  const handleLocationFilter = async (event) => {
    const value = await event.target.value;
    setLocation(value);
  };

  React.useEffect(() => {
    console.log(location);
    handleSearching();
  }, [location]);

  // const [filters, setFilters] = useState({});

  // const handleFilters = (location, tag, commitment) => {
  //   const finalFilter = {
  //     location: location.location,
  //     tag: tag.tag,
  //     commitment: commitment.commitment,
  //     username: "All",
  //   };
  //   setFilters(finalFilter);
  // };

  const [listingdata, setListingdata] = useState([]);
  const listingdatatemp = [];

  const handleSearching = () => {
    console.log("searching now");
    const getAllListings = async () => {
      const res = await axios.get(
        "http://54.95.245.238:8080/listingpage",
        // {
        //   filters: {
        //     username: "all",
        //     tag: "Clean Energy",
        //     location: "all",
        //     commitment: "all",
        //   },
        // },
        {
          params: {
            username: "All",
            tag: tag,
            location: location,
            commitment: commitment,
            inName: `${search}`,
          },
          auth: {
            username: "admin@lendahand.com",
            password: "password",
          },
        }
      );
      console.log(res.data);
      setListings(res.data);
      console.log(listings);
    };
    getAllListings();
  };

  React.useEffect(() => {
    console.log("get listings success", listings);
    const listingstemp = listings;
    //making the listingdata array
    listingstemp.map((info, index) => {
      var imageurl = "";

      //api call for the image
      const getImage = async () => {
        try {
          const res = await axios.get(
            "http://54.95.245.238:8080/listingpage/" + info.id + "/image",
            {
              responseType: "arraybuffer",
            },
            {
              auth: {
                username: username,
                password: password,
              },
            }
          );

          const imagedata = res.data;
          const contenttype = res.headers.get("content-type");
          var blob = new Blob([imagedata], { type: contenttype });
          imageurl = (URL || webkitURL).createObjectURL(blob);
          listingdatatemp[index] = {
            name: info.name,
            des: info.des,
            id: info.id,
            imageurl: imageurl,
          };
        } catch (error) {
          imageurl = `url("https://www.kindpng.com/picc/m/55-553143_transparent-plant-cartoon-png-transparent-cartoon-plant-png.png")`;
          listingdatatemp[index] = {
            name: info.name,
            des: info.des,
            id: info.id,
            imageurl: imageurl,
          };
        }
      };
      getImage();
    });
    setListingdata(listingdatatemp);
  }, [listings]);

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  var show = false;

  useEffect(() => {
    if (listingdata.length > 0) {
      show = true;
    }
    console.log("listingdata has been updated");
    console.log("show", show, "listingdata", listingdata);
    console.log("force update");
    forceUpdate();
  }, [listingdata]);

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          background: "white",
          direction: "column",
          justifyContent: "flex-start",
          width: "100vw",
        }}
      >
        <CssBaseline />
        <Box
          disableGutters
          sx={{
            background: "white",
          }}
        >
          <NavigationBar />
        </Box>
        <Box sx={{ height: "10", background: "gray" }} />
        <Box
          sx={{
            background: "white",
            marginTop: 11,
          }}
        >{/* <SearchBar /> */}
          <form>
            <TextField
              id="search-bar"
              className="text"
              label="Search"
              variant="outlined"
              placeholder="Project Title..."
              size="small"
              sx={{
                width: "92vw",
              }}
              onChange={(e) => setSearch(e.target.value)}
            />
            <IconButton
              //type="submit"
              aria-label="search"
              onClick={() => {
                handleSearching();
              }}
              //onClick={()=>{console.log("hello");}}
            >
              <SearchIcon style={{ fill: "blue" }} />
            </IconButton>
          </form>
        </Box>
        <Box
          sx={{
            background: "white",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            m: 1,
            p: 2,
          }}
        >
          <Box maxWidth={false} sx={{ minWidth: 180, maxHeight: 10, px: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Location</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={location}
                label="location"
                onChange={handleLocationFilter}
                size="sm"
              >
                <MenuItem value={"North"}>North</MenuItem>
                <MenuItem value={"South"}>South</MenuItem>
                <MenuItem value={"East"}>East</MenuItem>
                <MenuItem value={"West"}>West</MenuItem>
                <MenuItem value={"Central"}>Central</MenuItem>
                <MenuItem value={"All"}>All</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box maxWidth={false} sx={{ minWidth: 180, maxHeight: 10, px: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Commitment</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={commitment}
                label="commitment"
                onChange={handleCommitmentFilter}
                size="sm"
              >
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"Ad Hoc"}>Ad Hoc</MenuItem>
                <MenuItem value={"1 Week"}>1 Week</MenuItem>
                <MenuItem value={"1 Month"}>1 Month</MenuItem>
                <MenuItem value={"3 Months"}>3 Months</MenuItem>
                <MenuItem value={"6 Months"}>6 Months</MenuItem>
                <MenuItem value={"1 Year"}>1 Year</MenuItem>
                <MenuItem value={"Long-Term"}>Long-Term</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box maxWidth={false} sx={{ minWidth: 180, maxHeight: 10, px: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Tag</InputLabel>
              <Select
                labelId="tag"
                id="tag"
                value={tag}
                label="tag"
                onChange={handleTagFilter}
              >
                <MenuItem value={"Coastal"}>Coastal</MenuItem>
                <MenuItem value={"Marine"}>Marine</MenuItem>
                <MenuItem value={"Jungle"}>Jungle</MenuItem>
                <MenuItem value={"Clean Energy"}>Clean Energy</MenuItem>
                <MenuItem value={"Agriculture"}>Agriculture</MenuItem>
                <MenuItem value={"Recycling and Waste"}>
                  Recycling and Waste
                </MenuItem>
                <MenuItem value={"Others"}>Others</MenuItem>
                <MenuItem value={"All"}>All</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Container
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "center",
            background: "white",
marginTop: 10,
            marginBottom: 10,
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            spacing={4}
            sx={{
              width: "100vw",
              background: "white",
            }}
          >
            {console.log("I am in the return", "listingdata", listingdata)}
            {listingdata.map(
              (data, index) => (
                console.log(
                  "I am in the map, and I am rendering this listing",
                  data.name
                ),
                (
                  <Grid item key={data.id} xs={12} sm={6} md={4}>
                    <Listing
                      name={data.name}
                      description={data.des}
                      id={data.id}
                      buttonName={"view"}
                      imageUrl={data.imageurl}
                    />
                  </Grid>
                )
              )
            )}
          </Grid>
        </Container>
      </Container>
    </ThemeProvider>
  );
}
