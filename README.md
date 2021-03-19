# Accident info and bike locations on UI #
## introduction
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/),  [Redux Toolkit](https://redux-toolkit.js.org/ template. backend code for this api you can find it [here](https://github.com/vihang16/collision-details-backend)

below are the version used for this project

 - npm-6.14.10
 - react-17.0.1
 - react-redux-7.2.2
 - react-scripts - 4.0.3
 - react-toolkit - 1.5.0
 - axios - 0.21.1
 - mapbox-gl - 2.1.1
 - turf - 6.3.0

this module is created using below command
npx create-react-app my-app --template redux

by doing this it created ready to go app using react-redux, below are advantages of using it

A configureStore() function which provides automatic support for Redux-thunk, Redux DevTools Extension, and also passes the default middleware.

A createReducer() utility which provides support for immer library that allows writing the immutable code mutably.

A createAction() utility that returns an action creator function.

A createSlice() function that comes in handy to replace create action and create Reducer functions with a single function.

A createAsyncThunk() that takes Redux strings as arguments and returns a Promise.

at launch of this app ( if you run it independently it will run on port 3000, if you are running it through docker it will use 4000 port) it will make below calls to backend app

**getBikeParkingDetailsFromDb** - this call is responsible for getting bike start and end location details from backend 

**getCollisionDetailsFromDb** - this call gets all valid collsion location details for all the city where either any cyclist is injured or killed.

once this data gets loaded map from mapbox-gl will get render along with markers of collision and bike start/end points
below are the markers used for above items.
1. for bike start/end ![location](src/bicycle-marker.jpg?raw=True?raw=True "bike-marker") on map this will display bike location name as title
2. for collision ![location](src/sample-marker.png?raw=True?raw=True "bike-marker") on map this will display with borough name as title


once you start the project you may find map on left hand-side like this
![initial position](https://user-images.githubusercontent.com/17112329/111796786-86cb5a80-88ee-11eb-9ad4-97b8f7f1eeba.png)

to see this map on full UI please open inspect element ( working on this issue to keep map size constant )
if you do not see cooridnates at the time of load please drag your map or down (it may happen due to zooming into different location due to size of map shrinked)
to find distance between any points select first point and second point you will left top distance in miles please refer screenshot below
![distance image](https://user-images.githubusercontent.com/17112329/111796629-5c799d00-88ee-11eb-8738-85e6c2e9b924.png)



to run this project independently, you can run with below scripts
### `npm start`


## Future Course of action
1. keep UI consistent irrespective of change in display size
2. Draw a line between where user wants to find distance
3. Search for the neares collision location from bike start/end location
4. give different search criterias to use based on location/time or fatality.


