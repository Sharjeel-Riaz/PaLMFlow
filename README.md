# PaLMFlow

PaLMFlow is an innovative project developed using [React
Native](https://reactnative.dev/) with [Expo](https://expo.dev/) and powered by
[Next.js](https://nextjs.org/). This project combines the capabilities of
generative AI provided by Google's [PaLM 2.0](https://developers.generativeai.google/products/palm) with the ease of building your own RESTful
API using Next.js.

![Banner](https://raw.githubusercontent.com/Sharjeel-Riaz/React-Native/main/Projects/PaLMFlow/App/Assets/PaLMFlow%20Banner.png)

## Features

- 💬 Conversational AI Integration
- 🌐 Next.js RESTful API
- 🔐 Authentication and Navigation
- 🎨 Beautiful Interface
- ⚡ Good Performance
- 📡 Axios Integration for RESTful API

## Usage

This section explains on how you can create your own local environment for
[PaLMFlow](https://github.com/Sharjeel-Riaz/PaLMFlow).

- First of all, what you need to do is to go to the [documentation](https://reactnative.dev/docs/environment-setup) on react
  native to properly set up your development environment.
- I would prefer to follow through the proper installation of development
  environment through the react native cli method for faster integration.
- After setting up your development environment, you need to clone or fork the
  repository, whatever feels good to you.
- Now open the terminal at the directory where you have the project and run `npm
install` to download all the necessary dependencies.
- Now there are some specific environment varibales that you might need to fill
  in order to run the project properly.
- Set up a google cloud account if you have'nt already and create a new project.
- Go to the dashboard of the project that you just created & open the `API &
Services` Category. Onwards select the `OAuth consent screen` and fill in the
  required information to setup your consent screen.
- Now select the `Credentials` category and create a new `OAuth client ID` by
  selecting the `Android` platform.
- You need to add the following:

```
Package name = com.palmflow.palmflow

SHA-1 certificate fingerprint = "Your fingerprint key without double quotes."
```

- Use the help of internet in order to find your SHA-1 certificate fingerprint
  native to your local development environment.
- Now you have the OAuth client ID for your android device. If you want to test
  it on iOS, you need to create a new OAuth client ID for iOS as well. Again use
  the internet to knock yourself out.
- The next thing you need is to create your own RESTful API end-point and for
  that you can follow up from here:
  [Bard-API](https://github.com/Sharjeel-Riaz/Bard-API)
- Create a file named `.env` in the root directory of the project and add the
  following:

```
EXPO_PUBLIC_ANDROID_CLIENT_ID = "Your OAuth Android Client ID key with double quotes"

EXPO_PUBLIC_API_END_POINT = "Your RESTful API's end-point with double quotes. (e.g. "https://example.com/api")"
```

- Now run `npx expo run:android` to open the local environment.

- Pro tip: In order to ensure that your application is working; the above
  command builds a gradle configuration and if it does not for your case then
  there might be something wrong with you setting up your environment.

- Feel free to use it or make any necessary modifications `:D`
