

import marker from './sample-marker.png'
import bicycleMarker from './bicycle-marker.jpg'

import styles  from './App.css';
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as turf from '@turf/turf';
import mapboxgl from 'mapbox-gl';
import { getBikeInfo, mapDetails, getCollisionInfo, collisonDetails } from './features/counter/getInfo/getDetails.js'
<link href="https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css" rel="stylesheet"></link>



function App() {
  const dispatch = useDispatch();
  const [dataLoaded, setDataLoaded] = useState(false);
  const dataToDisplay = useSelector(mapDetails);
  const collisionInfo = useSelector(collisonDetails);
  const firstLoad = useRef(true);
  mapboxgl.accessToken = 'pk.eyJ1IjoidmloYW5nMTYiLCJhIjoiY2ttOHowc2ZhMWN2OTJvcXJ0dGpiY21pNyJ9.hK5Wxwby89E7tKWoBoY5bg';
  const mapContainer = useRef(null);
  
  useEffect(() => {
    if( firstLoad.current){
      firstLoad.current =false;
      return;
    }
    var map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-74, 40],
      zoom: 8
    });
    var distanceContainer = document.getElementById('distance');
 
    // GeoJSON object to hold our measurement features
    var geojson = {
    'type': 'FeatureCollection',
    'features': []
    };
    
    // Used to draw a line between points
    var linestring = {
    'type': 'Feature',
    'geometry': {
    'type': 'LineString',
    'coordinates': []
    }
    };
    map.on('load', function () {
      
      loadDataFromPara(dataToDisplay, bicycleMarker, 'bikeLocation', 'bikePoints', 'bike-marker', 0.2)
      loadDataFromPara(collisionInfo, marker, 'collisionLocation', 'collisionPoints', 'collision-marker', 1)
      map.on('click', function (e) {
        
         if(geojson.features.length < 2){
          geojson.features.push({'longitude':e.lngLat.lng,
                                 'latitude':e.lngLat.lat})
            if(geojson.features.length == 2){
              measureDistance();
              geojson.features = [];
            
          }
        }
      //geojson.features.push(point);
      });

    });
    
    function measureDistance(){
      let from = []
      let to = []
      var options = {
        units: 'miles'
      };
        geojson.features.forEach( function (data1, index) {
         
            if(index === 0)
                from = [data1['longitude'], data1['latitude']]
            if(index === 1)
                to = [data1['longitude'], data1['latitude']]
        })
        turf.distance(from, to, options)
        var distance = turf.distance(to, from, options);

        var value = document.getElementById('map-overlay')
        value.innerHTML = "Distance: " + distance.toFixed([2]) + " miles"

    }
    setDataLoaded(true);
    function loadDataFromPara(data, image1, sourceName, layerName, imageMarker, marketSize) {
      map.loadImage(
        image1,
        function (error, image) {
          if (error) throw error;
          map.addImage(imageMarker, image);
          
          map.addSource(sourceName, {
            'type': 'geojson',
            'data': {
              'type': 'FeatureCollection',
              'features': data
            }
          });

          // Add a symbol layer
          map.addLayer({
            'id': layerName,
            'type': 'symbol',
            'source': sourceName,
            'layout': {
              'icon-size': marketSize,
              'icon-image': imageMarker,
              
              'text-field': ['get', 'title'],
              'icon-allow-overlap': true,
              'text-font': [
                'Open Sans Semibold',
                'Arial Unicode MS Bold'
              ],
              'text-offset': [0, 1.25],
              'text-anchor': 'top'
            }
          });



        }
      );
    }
  }, [dataToDisplay]);

  useEffect(() => {
    dispatch(getBikeInfo())
    dispatch(getCollisionInfo())
  }, [])

  return (
    
    <div className="district-map-wrapper" style={dataLoaded ? undefined : { display: 'none' }}>
      <div id="districtDetailMap" >
        <div style={{ height: "100%" }} ref={mapContainer}>
        <div id='map-overlay'>Distance: </div>
        </div>

      </div>
     
    </div>
   
  );
}

export default App;
