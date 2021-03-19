import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getDetails = createSlice({
    name: 'getInfo',
    initialState: {
      collision_info: [],
      features:[]
        },
    reducers: {
      bikeParkingInfo: (state, action) => {
        let data = action.payload;
        
        let result = []
        data.forEach(function (data1, _index) {
            //console.log(data1['fields']);
            var startLocJsonData = gettingDataFromJSon( 'start_station_longitude', 'start_station_latitude', 'start_station_name', data1)
            var endLocJsonData= gettingDataFromJSon( 'end_station_longitude', 'end_station_latitude', 'end_station_name', data1)
            result.push(endLocJsonData);
            result.push(startLocJsonData);
          });
        
        state.features = result
        
      },
      collisionDetailInfo: (state, action) => {
        let data = action.payload;
        let result = []
        //console.log('data in reducer:'+data)
        data.forEach(function (data1, _index) {
          
          var collisionData=gettingDataFromJSon( 'longitude', 'latitude', 'borough', data1)
            
            result.push(collisionData);
            //result.push(startLocJsonData);
          
          
      });
      state.collision_info = result
      },
      
    },
  });

  function gettingDataFromJSon(longitude, latitude, propertyName, data){
    let resultantData ={
      //  feature for Mapbox DC
       'type': 'Feature',
       'geometry': {
         'type': 'Point',
         'coordinates': [
           Number(data['fields'][longitude]),
           Number(data['fields'][latitude])
         ]
       },
       'properties': {
         'title': data['fields'][propertyName]
       }
     }
     return resultantData

  }
  export const getBikeInfo = dispatch =>{
    return async (dispatch, _getState) => {
        try {
          // make an async call in the thunk
          const bikeParking = await axios.get('http://127.0.0.1:5000/getBikeParkingDetailsFromDb')
          
          // dispatch an action when we get the response back
          dispatch(bikeParkingInfo(bikeParking.data))
        } catch (err) {
          console.error('error while retrieving bike info')
        }
      }

  }

  export const getCollisionInfo = _dispatch =>{
    return async (dispatch, _getState) => {
      try {
        // make an async call in the thunk
        const collsion = await axios.get('http://127.0.0.1:5000/getCollisionDetailsFromDb')
        
        // dispatch an action when we get the response back
        //console.log("data from server:"+collsion.data)
        dispatch(collisionDetailInfo(collsion.data))
      } catch (err) {
        console.error('error while retrieving collsion info')
      }
    }
  }
  export const {  bikeParkingInfo, collisionDetailInfo } = getDetails.actions;
  export const mapDetails = state => state.bikeInfo.features;
  export const collisonDetails =  state => state.bikeInfo.collision_info;
  export default getDetails.reducer;