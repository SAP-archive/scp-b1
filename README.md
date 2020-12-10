[![REUSE status](https://api.reuse.software/badge/github.com/SAP-samples/scp-b1)](https://api.reuse.software/info/github.com/SAP-samples/scp-b1)
[![License: Apache2](https://img.shields.io/badge/License-Apache2-green.svg)](https://opensource.org/licenses/Apache-2.0)
![CI](https://github.com/SAP-samples/scp-b1/workflows/CI/badge.svg)

# scp-b1
[![SAP](https://i.imgur.com/kkQTp3m.png)](https://cloudplatform.sap.com)
[![SAP](https://i.imgur.com/2iFZdxN.png)](https://cloudplatform.sap.com)

## Description
This is a sample applications based on [Cloud Foundry](https://www.cloudfoundry.org/). It is coded in [NodeJ](https://nodejs.org/en/) and integrated with [SAP Business One](https://www.sap.com/uk/products/business-one.html) using the [OData Services](https://odata.org) of the [SAP Business One Service Layer](https://www.youtube.com/watch?v=zaF_i7x9-s0) to list Items. 

This application is based in the [beer-list](https://github.com/mariantalla/beer-list) app.

🔵 [Live Version](https://scp-b1-boring-puku-zo.cfapps.eu10.hana.ondemand.com)

## Requirements
*  [Install the Cloud Foundry CLI](https://developers.sap.com/tutorials/cp-cf-download-cli.html)
*  [Learn the Fundamentals of SCP Cloud Foundry](https://developers.sap.com/tutorials/cp-cf-fundamentals.html)  
* A SAP Business One Enviroment with Service Layer or [SAP API Hub Account](https://api.sap.com/)

### Deployment
Clone this repository
```sh
git clone https://github.com/SAP-Samples/scp-b1.git
```
From the root directory, using the [Cloud Foundry CLI](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html) push your app to the SAP CP Cloud Foundry
```sh
cf push --random-route
```
Then set the Environment Variables accordingly

**Example with your own B1**
```sh
cf set-env scp-b1 B1_SERVER_ENV http://hanab1
cf set-env scp-b1 B1_SLPORT_ENV 50001
cf set-env scp-b1 B1_SLPATH_ENV /b1s/v2/      
cf set-env scp-b1 B1_USER_ENV manager
cf set-env scp-b1 B1_PASS_ENV 1234
cf set-env scp-b1 B1_COMP_ENV SBODEMOUS
```

**Example with [API Hub](https://api.sap.com/api/Items/resource)**
```sh
cf set-env scp-b1 B1_SERVER_ENV https://sandbox.api.sap.com
cf set-env scp-b1 B1_SLPATH_ENV /sapb1/b1s/v2/     
cf set-env scp-b1 B1_COMP_ENV SBODEMOUS
cf set-env scp-b1 APIKey <Your API Key>
```

Restart your application (so it can read the new environment variables)
```sh
$ cf restart scp-b1
```

Access the app from the URL route showed in the terminal

## Support and Contributions  
This repository is provided "as-is". With no Warranty or support

If you have questions, please ask.

## License
Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](LICENSES/Apache-2.0.txt) file.
