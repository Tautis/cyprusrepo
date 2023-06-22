import React, { useEffect } from 'react';

function Recent() {
  useEffect(() => {
    // const currentUrl = window.location.href;
    const urlParams = new URLSearchParams(window.location.search);
    const currentid = urlParams.get('id');
    // Get existing URLs from local storage
    const storedIds = localStorage.getItem('recentIds');
    let ids = [];

    if (storedIds) {
      // Parse the stored URLs from JSON
      ids = JSON.parse(storedIds);
    }

    // Check if the current URL already exists in the array
    const isIdEsists = ids.includes(currentid);

    if (!isIdEsists) {
      // Add the current URL to the front of the array
      ids.unshift(currentid);

      // Limit the number of URLs to a maximum of three
      if (ids.length > 3) {
        ids = ids.slice(0, 3);
      }

      // Save the updated URLs array to local storage
      localStorage.setItem('recentIds', JSON.stringify(ids));
    }
  }, []);


}

export default Recent;