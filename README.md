# JuiceShopApp
This is a cross-platform mobile application for a juice shop, built using React Native and Expo. The application includes a menu component to display juices with images, an order list component to display the current order, and functionalities for managing orders.

#1. Initial Setup:

Install Node.js and npm: If you haven't already, download and install Node.js . npm comes bundled with Node.js.
Install Expo CLI globally: Expo CLI is a command-line tool for creating and managing Expo projects. Install it globally using npm:
npm install -g expo-cli

Create a New React Native Project: Use Expo CLI to create a new React Native project:
expo init JuiceShopApp
Choose the "Managed workflow" template when prompted.

#2. Navigate to Your Project Directory and Start the Application:
Navigate to the Project Directory:
cd JuiceShopApp

Start the Application:
expo start or npx expo

On your mobile download the latest Expo Go app to scan the QR Code to connect to the server

#Application Structure and Features:
#Menu Component:
Displays a list of juices with their images.
Allows users to add juices to the current order.

#Order List Component:
Displays the current order list.
Provides options to remove items from the order.

#Order Management:
Functions to handle adding items to the order, removing items from the order, and placing new orders.

#Running the Application:
After starting the application (expo start), you can run it on an Android or iOS device using the Expo Go app or an Android/iOS simulator.

#Dependencies:
This project relies on the Expo framework, which includes various dependencies managed by Expo CLI. You can find the dependencies listed in the package.json file in your project directory.

#License:
This project is licensed under the MIT License.
