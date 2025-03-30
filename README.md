# Job Application App - React Native


App demo => [https://drive.google.com/file/d/1cjBVHz1mR47BUZUhhbXhF4Rfja7DzLlj/view?usp=sharing](https://drive.google.com/file/d/15Qr4uAFUsQFYU6VU_rRqkNdJ5Y2jfcgJ/view?usp=sharing)

## Overview

This is a React Native application designed to help users browse and bookmark job listings. The app fetches job data from an API and allows users to view job details and manage their bookmarks.

## Features

- **Job Listings**: Browse through a list of available jobs.
- **Job Details**: View detailed information about each job, including location, salary, and contact information.
- **Bookmarks**: Save jobs to your bookmarks for easy access later.
- **Modern UI**: Enjoy a sleek and modern user interface with intuitive navigation.

## Screens

1. **JobsScreen**: Displays a list of job listings fetched from an API. Users can view job details and bookmark jobs.
2. **JobDetailsScreen**: Shows detailed information about a selected job, including company name, location, salary, and job type.
3. **BookmarksScreen**: Lists all bookmarked jobs, allowing users to view details or remove bookmarks.

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Rohit-Vk24/Job-Application-App---React-Native.git
   cd Job-Application-App---React-Native
   ```

2. **Install Dependencies**:
   Ensure you have [Node.js](https://nodejs.org/) and [Expo CLI](https://docs.expo.dev/get-started/installation/) installed.
   ```bash
   npm install
   ```

3. **Run the App**:
   ```bash
   npx expo start
   ```
   Use the Expo Go app on your mobile device or an emulator to view the app.

## Code Structure

- **App.js**: Sets up the navigation structure using React Navigation, including a bottom tab navigator for Jobs and Bookmarks.
- **screens/JobsScreen.js**: Contains the logic for fetching and displaying job listings. Includes bookmarking functionality.
- **screens/JobDetailsScreen.js**: Displays detailed information about a job. Allows users to bookmark or remove bookmarks.
- **screens/BookmarksScreen.js**: Shows a list of bookmarked jobs with options to view details or remove them.
- **context/BookmarkContext.js**: Provides context for managing bookmarks across the app.

## Dependencies

- **React Native**: Framework for building native apps using React.
- **Expo**: A platform for universal React applications.
- **React Navigation**: Routing and navigation for React Native apps.
- **AsyncStorage**: For storing bookmarks locally.
- **Vector Icons**: For using icons in the app.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.


