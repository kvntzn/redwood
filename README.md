<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <!-- <a href="https://github.com/github_username/repo_name">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

<h3 align="center">Redwood Project</h3>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

React Native Appointment Scheduling application that enables users to browse active doctors, view their available 30-minute time slots, and book appointments using provided weekly schedule data.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Expo][Expo]][Expo-url]
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Setup

1. Clone the repo
   ```sh
   git clone https://github.com/kvntzn/redwood.git
   ```
2. Install and use the correct version of Node using [NVM](https://github.com/nvm-sh/nvm)
   ```sh
   nvm install
   ```
3. Install dependencies
   ```sh
   yarn
   ```
4. Run the project
   ```js
   yarn ios
   yarn android
   ```
5. Run Unit and Integration test
   ```js
   yarn test
   ```
6. Run E2E test
   ```js
   yarn start
   yarn e2e:test
   ```
   <p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

### Usage

- **Doctors List** — Browse available doctors with pull-to-refresh, showing name and timezone.
- **Doctor Detail** — Interactive calendar and timeline view of a doctor's weekly availability. Long-press an available time slot to book a 30-minute appointment.
- **Booking Confirmation** — Review and confirm appointment details before saving.
- **My Bookings** — View all bookings grouped by date. Cancel bookings with a confirmation prompt.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Assumptions & Design Decisions

- There’s only one GET API for doctors (static JSON, no query params).

  - Fetch everything once, store it locally, and filter on the client when showing Doctor Details and Booking Confirmation.

- There’s no POST API for creating bookings.

  - Simulated booking creation using `asyncThunk`, so loading and error handling are managed by Redux.

- Single-user setup.

  - The app doesn’t check for conflicts with other users. In a real-world setup, this would be handled by the backend.

- Bookings are stored locally.

  - All bookings are persisted to AsyncStorage using Redux Persist.

- Timezone follows the doctor.

  - All availability and booking times are displayed using the doctor’s configured timezone to keep it consistent.

- Duplicate booking prevention.

  - Each booking uses a composite ID:  
    `${doctorId}-${date}-${startTime}`  
    If the ID already exists, the booking is rejected.

- Redux Toolkit + RTK Query.

  - Used for centralized state management, caching, and built-in loading/error handling. Redux Persist adds basic offline support.

- UI inspiration.
  - Inspired by the native iOS Calendar app (glass style, long press interaction, modal confirmation).

## Known Limitations & Future Improvements

- No real backend integration.

  - The app reads from a static JSON file and doesn’t sync bookings to a server.

- Limited timezone clarity.

  - It only shows the doctor’s timezone. Showing both doctor and user timezone would reduce confusion.

- No authentication.

  - There’s no login system, so bookings are tied only to the current device.

- No payments.

  - A production app would likely require this.

- No appointment notes.

  - Bookings only include date, time, and doctor. Adding a reason/notes field would improve usability.

- No search or filtering for doctors.

  - Users scroll through the full list. Search by name would improve the experience.

- No push notifications or reminders.
  - Adding reminders would improve the overall experience.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- Shields.io badges. You can a comprehensive list with many more badges at: https://github.com/inttter/md-badges -->

[Expo]: https://img.shields.io/badge/Expo-000000?style=for-the-badge&logo=Expo&logoColor=white
[Expo-url]: https://expo.dev/blog
