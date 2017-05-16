
       // Replace with your client ID from the developer console.
    console.log('googlestuff');
    const CLIENT_ID = '146644134636-h2i32dh4th00aqo4d4honm0o4vkcpaup.apps.googleusercontent.com';

    // Set authorized scope.
    const SCOPES = ['https://www.googleapis.com/auth/analytics.readonly'];


    function authorize(event) {
        // Handles the authorization flow.
        // `immediate` should be false when invoked from the button click.
      const useImmdiate = event ? false : true;
      const authData = {
        client_id: CLIENT_ID,
        scope: SCOPES,
        immediate: useImmdiate,
      };
      console.log('authorizing');

      gapi.auth.authorize(authData, (response) => {
        const authButton = document.getElementById('auth-button');
        if (response.error) {
          authButton.hidden = false;
        } else {
          authButton.hidden = true;
          queryAccounts();
        }
      });
    }


    function queryAccounts() {
        // Load the Google Analytics client library.
      console.log('querying accounts');
      gapi.client.load('analytics', 'v3').then(() => {
            // Get a list of all Google Analytics accounts for this user
        gapi.client.analytics.management.accounts.list().then(handleAccounts);
      });
    }


    function handleAccounts(response) {
      console.log('handling accounts');

        // Handles the response from the accounts list method.
      if (response.result.items && response.result.items.length) {
            // Get the first Google Analytics account.
        let firstAccountId = response.result.items[0].id;
        console.log(response.result.items);
        const arrayLength = response.result.items.length;
        for (let i = 0; i < arrayLength; i++) {
          const name = response.result.items[i].name;
          if(name == 'emissary') {
            firstAccountId = response.result.items[i].id;
            break;
          }
        }
            // Query for properties.
        queryProperties(firstAccountId);
      } else {
        console.log('No accounts found for this user.');
      }
    }


    function queryProperties(accountId) {
        // Get a list of all the properties for the account.
      gapi.client.analytics.management.webproperties.list(
                {'accountId': accountId})
                .then(handleProperties)
                .then(null, (err) => {
                    // Log any errors.
                  console.log(err);
                });
    }


    function handleProperties(response) {
        // Handles the response from the webproperties list method.
      if (response.result.items && response.result.items.length) {
            // Get the first Google Analytics account
        const firstAccountId = response.result.items[0].accountId;

            // Get the first property ID
        const firstPropertyId = response.result.items[0].id;

            // Query for Views (Profiles).
        queryProfiles(firstAccountId, firstPropertyId);
      } else {
        console.log('No properties found for this user.');
      }
    }


    function queryProfiles(accountId, propertyId) {
        // Get a list of all Views (Profiles) for the first property
        // of the first Account.
      gapi.client.analytics.management.profiles.list({
        'accountId': accountId,
        'webPropertyId': propertyId,
      })
                .then(handleProfiles)
                .then(null, (err) => {
                    // Log any errors.
                  console.log(err);
                });
    }


    function handleProfiles(response) {
        // Handles the response from the profiles list method.
      if (response.result.items && response.result.items.length) {
            // Get the first View (Profile) ID.
        const firstProfileId = response.result.items[0].id;

            // Query the Core Reporting API.
        queryCoreReportingApi(firstProfileId);
            // Query the Event Tacker API
        queryEventReportingApi(firstProfileId);
        queryConversionRate(firstProfileId);

        queryChart(firstProfileId);
      } else {
        console.log('No views (profiles) found for this user.');
      }
    }


    function queryCoreReportingApi(profileId) {
        // Query the Core Reporting API for the number sessions for
        // the past seven days.
      gapi.client.analytics.data.ga.get({
        'ids': 'ga:' + profileId,
        'start-date': '7daysAgo',
        'end-date': 'today',
        'metrics': 'ga:sessions,ga:pageviews,ga:totalEvents',
      })
                .then((response) => {
                  // get the number of login counts

                  let resultStr = '';
                  const resultRow = response.result.totalsForAllResults;
                  resultStr = resultRow['ga:pageviews'];
                  resultStr2 = resultRow['ga:sessions'];
                  console.log(resultStr);
                  console.log(document.getElementById('pageViews').innerHTML);
                  document.getElementById('sessionCount').innerHTML = resultStr2;
                  document.getElementById('pageViews').innerHTML = resultStr;
                })
                .then(null, (err) => {
                    // Log any errors.
                  console.log(err);
                });
    }
    function queryConversionRate(profileId) {
        // Query the Core Reporting API for the number sessions for
        // the past seven days.
      gapi.client.analytics.data.ga.get({
        'ids': 'ga:' + profileId,
        'start-date': '2016-01-01',
        'end-date': 'today',
        'metrics': 'ga:pageviews',
        'dimensions': 'ga:pagePath',
        'filter': 'ga:pagePath==/',
      })
                .then((response) => {
                  // get the number of login counts
                  const view = parseInt(response.result.rows[0][1]);
                  console.log('Page Views:' + view);
                  const companies = getCompanies();
                  const num = companies.length;
                  const convRate = (num/view * 100);
                  const rate = convRate.toFixed(2);
                  console.log('Conversion Rate' + rate);
                  document.getElementById('convRate').innerHTML = rate + '%';
                })
                .then(null, (err) => {
                    // Log any errors.
                  console.log(err);
                });
    }
    function queryChart(profileId) {
        // Query the Core Reporting API for the number sessions for
        // the past seven days.
      gapi.client.analytics.data.ga.get({
        'ids': 'ga:' + profileId,
        'start-date': '59daysAgo',
        'end-date': 'today',
        'metrics': 'ga:newUsers',
        'dimensions': 'ga:date',
      })
                .then((response) => {
                  // get the number of login counts

                  // let resultStr = '';
                  const resultRow = response.result;
                  // resultStr = resultRow['ga:newUsers'];
                  const arrayLength = resultRow.rows.length;
                  const arr = [];
                    // console.log("Array length: " + arrayLength);
                  for (let i = 0; i < arrayLength; i++) {
                        // console.log("Result Row: " + resultRow.rows[i][1]);
                    const val = parseInt(resultRow.rows[i][1]);
                    arr.push(val);
                  }
                  console.log(arr);
                  $('.mask-loading2').hide();
                  $('.monthly-sales').sparkline(arr, {
                    type: 'bar',
                    barColor: '#00a65a',
                    height: '80px',
                    barWidth: 10,
                    barSpacing: 2,
                  });
                })
                .then(null, (err) => {
                    // Log any errors.
                  console.log(err);
                });
    }
    function queryEventReportingApi(profileId) {
        // Query the Core Reporting API for the events
      gapi.client.analytics.data.ga.get({
        'ids': 'ga:' + profileId,
        'start-date': '6daysAgo',
        'end-date': 'today',
        'dimensions': 'ga:eventLabel',
        'metrics': 'ga:totalEvents',
      })
                .then((response) => {
                  // const formattedJson = JSON.stringify(response.result, null, 2);
                  // document.getElementById('event-output').value = formattedJson;

                  let resultStr = '';
                  const resultRow = response.result.rows;
                  for (const row in resultRow) {
                    if (resultRow[row][0] === 'loginButtonClick') {
                      resultStr += resultRow[row][1];
                      break;
                    }
                  }
                  document.getElementById('eventCount').innerHTML = resultStr;
                    // get the number of login counts
                })
                .then(null, (err) => {
                    // Log any errors.
                  console.log(err);
                });
    }
    function getCompanies() {
      let json;
      $.ajax({
        dataType: 'json',
        type: 'GET',
        data: $('#response').serialize(),
        async: false,
        url: '/api/companies',
        success: function(response) {
          json = response;
          console.log(response);
        },
      });
      return json;
    }
    const companies = getCompanies();
    const num = companies.length;
    document.getElementById('companyCount').innerHTML = num;
    // Add an event listener to the 'auth-button'.
    document.getElementById('auth-button').addEventListener('click', authorize);
