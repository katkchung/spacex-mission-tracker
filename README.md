## Description:

A website that makes use of a free [SpaceX Graphql service](https://studio.apollographql.com/public/SpaceX-pxxbxen/home?variant=current) to display information about SpaceX missions. Can filter by manufacturer of each mission and sort list of missions alphabetically.

Note: The test is located in the Homepage folder

## To Run:

- If you don't have yarn installed, install it using `brew install yarn` (given that you have homebrew installed)
- `yarn install` to install packages
- `yarn start` to run app locally. Open [http://localhost:3000](http://localhost:3000) to view in the browser

### Impovements

- Add more information pages (e.g. launches, history, etc.)
- Sticky header on missions page
- Get list of manufacturers dynamically to accomodate for future missions
- Same with sort list, get rid of any hardcoded data
- Have default mission that loads so the details portion is not empty when the missions page is first visited
- Back to Homepage button (and eventually a Navigation Bar at the top for when other pages are added)
- Better logic for filters and sorts -> maybe abstracting that logic out to a higher layer that passes in filtered & sorted list to the MissionsList component
- Autocomplete for manufacturer filter is not as intuitive as I wanted for expecting more results the more filters you add. Probably switch to checkmark filter or some other display type to make it easier to tell that adding more filters means more options, or limiting it and using a Select component instead to only filter by one manufacturer at a time
- As the list gets longer, some sort of pagination so that the app won't have to load 1000 results which will definitely cause longer loading times
- Expandable sections that only render if they are expanded if I chose to display all the data instead of picking and choosing which data I thought would be the most relevant
