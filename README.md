# ios-project-action v1
Override your iIO Configuration on info.plist through github actions

## Features
* Override your iIO Configuration on info.plist through github actions

## Parameters

- `infoPlistPath`: **Required** Info Plist path to override version. It is a required parameter. The default value is "ios/AppName/Info.plist".

- `newCFBundleURLSchemes`: **Required** Build gradle path to override version. It is a required parameter. The default value is "com.googleusercontent.apps.XXX".

- `oldCFBundleURLSchemes`: **Required** Strings xml path to override version. It is a required parameter. The default value is "com.googleusercontent.apps.XXX2".

- `cleanNSExceptionDomains`: **Required** Main Activity path to override version. It is a required parameter. The default value is "true".

## Example
```
jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - name: set up JDK 1.11
        uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: 11.0.22+7
      - name: Change ios config
        uses: Neat-Pagos/ios-project-action@v1
        with:
          infoPlistPath: ios/AppName/Info.plist
          newCFBundleURLSchemes: com.googleusercontent.apps.XXX
          oldCFBundleURLSchemes: com.googleusercontent.apps.XXX2
          cleanNSExceptionDomains: true
```
