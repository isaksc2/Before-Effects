import {
    google,   // The top level object used to access services
    drive_v3, // For every service client, there is an exported namespace
    Auth,     // Namespace for auth related types
    Common,   // General types used throughout the library
  } from 'googleapis';
  
  // Note: using explicit types like `Auth.GoogleAuth` are only here for
  // demonstration purposes.  Generally with TypeScript, these types would
  // be inferred.
  const auth: Auth.GoogleAuth = new google.auth.GoogleAuth();
  const drive: drive_v3.Drive = google.drive({
    version: 'v3',
    auth,
  });
  
  // There are generated types for every set of request parameters
  const listParams: drive_v3.Params$Resource$Files$List = {};
  const res = await drive.files.list(listParams);
  
  // There are generated types for the response fields as well
  const listResults: drive_v3.Schema$FileList = res.data;