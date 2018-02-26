# cfDemoSummit18 - Step 4
[![SAP](https://i.imgur.com/kkQTp3m.png)](https://cloudplatform.sap.com)

This is a sample step by step guide of how to build cloud applications based on [Cloud Foundry](https://www.cloudfoundry.org/)

### Step 4 - SAP Business One Integration
The step 4 implements an integration between this loosely coupled application running on [SAP Cloud Platform](https://cloudplatform.sap.com) and SAP Business One running in a separated cloud. It will Synchronize the items stored in the database created on [Step 3](http://github.com/Ralphive/cfDemoSummit18/tree/step_3) with the SAP Business One using the B1 Service Layer

### Installation
From the root directory, switch to the step 4 branch
```sh
$ git checkout step_4
```
Using the [Cloud Foundry CLI](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html) push the step_3 branch of your app to the SAP CP Cloud Foundry
```sh
$ cf push
```

Check your app URL for the new option to Sync the data

