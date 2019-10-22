## About this application
This is an application designed to help locate restaurants near the Cogent Labs office in Roppongi. The restaurant information in this application is provided by the Foursquare Places API and the map is provided by Google Maps. 

A randomize button is provided to pick from a list of 50 recommended restaurants located within 1km of the Cogent Lab offices. Additionally, users can search via keyword to find a list of restaurants in the area more suited to their preferences, and randomize a restaurant based on that list as well. 

A live version of this application is deployed at [cogent.wilsonplau.com](https://cogent.wilsonplau.com) via Netlify. 

## Setup
This application was scaffolded using create-react-app. 

To start the application for development, please use: 
```bash
  $ yarn start
  // Navigate to localhost:3000
```

To build for deployment, please use:
```bash
  $ yarn build
```

This application requires three environment variables in a .env file that are self-explanatory:
```
  REACT_APP_GOOGLE_MAPS_KEY
  REACT_APP_FOURSQUARE_CLIENT_ID
  REACT_APP_FOURSQUARE_CLIENT_SECRET
```

There are additionally a number of other configurations that are available. In the config folder, `defaultLocation.js` can be used to change the default location of the application. `mapStyles.js` can be used to change the color scheme and display properties of Google Maps. 

## Testing
This application uses Jest / Enzyme for testing. To run those tests, please use:
```bash
  $ yarn test 
```

## Technical Implementation Details
- **React** - React was used in this application, integrated with react-redux. All components are implemented as functional components, where there is minimal use of useState and useRef outside of Redux, for state that would most certainly be only relevant in a local context. useEffect is used quite frequently as well to respond to component mounting and state changes. 

- **Redux / State Management / Redux-Thunk** - Redux is a bit heavy-handed for this application, but the original intention was, as described below, to use redux-persist in order to allow offline searching capability. React's new useContext may have been a better option here if offline state persistence was not considered. Redux-Thunk is used for asynchronous actions (data fetching, mainly). 

- **react-google-maps** – This application leans on the react-google-maps library to implement Google Maps. Due to this, this application relies on the library to be well-tested. It was definitely preferred to working with the Google Maps API directly and accelerated the processing of building this MVP. 

- **Styling** - This application implements the BEM pattern in SCSS, with separate SCSS files corresonding to each component. Meyer's classic CSS reset was also implemented as a starting point for the application. No styling libraries were used. 

- **Testing** - The tests implemented in this app focus on rendering, interactions and Redux using Jest and Enzyme. The Redux-Thunk actions were not tested, and depends on the API to respond consistently. Several of the more interaction-heavy features (scrollToView, panTo on the map, etc) were not tested as they're both difficult to test and mainly cosmetic features. End-to-end testing using Cypress was considered, but I ultimately did not find that it did not add significant value beyond what was already covered in unit testing. 


## Other Implementation Details and Notes
- **PWA/Offline Considerations** - This does not implement PWA requirements as I did not have enough time to figure out how to use Google Maps offline, which was the most critical part of the application. It would have been possible to store the initial state (the initial query for the top 50 recommendations around the office generally stay the same), but filtering / searching would have needed some alternative method for handling as well. (An initial implementation just filtered names and categories and searched for string matches from the first 50 recommendations)

- **Accessiblity** - This currently passes 100% in a Lighthouse Audit in terms of accessibility. However, the markers on the Google Map (and for certain users, the map interface itself) likely still pose accessiblity problems. 

- **Performance** – There are a few performance related considerations that were red-flagged in a Lighthouse audit of the application. While performance scored 100 on an unthrottled modern connection, it does not handle slower networks well, likely due to the requirements of Google Maps. This would potentially be resolved if some type of caching was implemente (especially offline Google Maps), as would be if this application met the specifications of a PWA.

- **Environment Variables & Security** - Currently, the Foursquare API is being directly called on the client side, and the request requires the client id and client secret as query parameters, making this information visible in the requests and the code. It would be better to build out a serverless function to wrap this request in order to protect this information, and additionally restrict the domains for those serverless functions. The same is true for the Google Maps key, but I do not believe there is a way of implementing Google Maps without divulging the API key, and it would be best to restrict IP / domain access instead. 

- **Static server** - This deployment currently depends on Netlify's static server to serve up the assets. If hosted on another platform, an Express static server may be required to serve the static build. 

- **Browser Compatibility** - This application was manually tested in Google Chrome, Safari and Firefox on Mac OS X at both desktop and mobile viewports. Currently, Safari does not support some of the smooth scrolling effects implemented in the results section. This application has not been tested in any version of Internet Explorer or Microsoft Edge. 

- **Icons** - The various icons used in this app were downloaded from The Noun Project. 