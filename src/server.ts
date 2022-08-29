require('dotenv').config();

import express, { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // //CORS Should be restricted
  // app.use(function(req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  //   next();
  // });

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );

  app.get( "/filteredimage/", async ( req: Request, res: Response ) => {
    
    // Get image_url param and store it
    let image_url:string = req.query.image_url;

    console.log(image_url);
    
    // Use util methods to convert image from url
    try {
      const filteredImage = await filterImageFromURL(image_url);

      console.log(filteredImage)
    
      if ( image_url === "" ) {
        return res.status(400)
                  .send(`image_url is invalid`);
      }
  
      return res.status(200)
                .sendFile(filteredImage, () => deleteLocalFiles([filteredImage]));
      
    } catch (error) {
      return res.status(500).send("Image not available");
    }
    
  } );
  

  // Deployed to: http://image-filter-starter-code-dev-dev.us-east-1.elasticbeanstalk.com/

  // WORKING URL: http://image-filter-starter-code-dev-dev.us-east-1.elasticbeanstalk.com/filteredimage?image_url=https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();