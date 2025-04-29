# Todo App + Weather + Jokes

A feature-rich React application combining todo management, weather forecasting, and daily jokes functionality.

## Features

### Todo Management
- Create, read, update, and delete todos (CRUD operations)
- Add todo items with title, description, and start time
- Mark todos as complete/incomplete
- Filter todos by status (All, Done, Not Done)
- Persistent storage using browser's localStorage
- Real-time updates

### Weather Dashboard
- Automatic location detection using IP address
- Current weather conditions display
- 5-day weather forecast
- Weather information includes:
  - Temperature
  - Feels like temperature
  - Humidity
  - Wind speed and direction
  - Weather descriptions with emoji indicators
- Location refresh capability

### Jokes Section
- Fetch random jokes from an external API
- Save favorite jokes
- Delete saved jokes
- Persistent storage for liked jokes
- Error handling for API failures

## Technologies Used

### Frontend
- React 18.3
- React Router v6 for navigation
- Context API for state management
- CSS3 for styling
- Vite as the build tool

### APIs
- OpenWeather API for weather data
- IP Stack API for location detection
- API Ninjas for jokes
- IPify for IP address detection

### Development Tools
- ESLint for code quality
- UUID for unique identifiers
- Local Storage for data persistence
- Environment variables for API key management

## Project Structure

```
src/
├── components/
│   ├── todo/
│   │   ├── TodoForm.jsx
│   │   └── TodoItem.jsx
│   ├── weather/
│   │   └── Weather.jsx
│   ├── jokes/
│   │   └── Jokes.jsx
│   └── Header.jsx
├── contexts/
│   ├── TodoContext.js
│   └── index.js
├── layouts/
│   └── MainLayout.jsx
├── App.jsx
└── main.jsx
```

## Setup and Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
VITE_OPENWEATHER_API_KEY=your_openweather_api_key
VITE_IPSTACK_ACCESS_KEY=your_ipstack_api_key
VITE_NINJA_JOKES_API_KEY=your_ninja_jokes_api_key
```

4. Start the development server:
```bash
npm run dev
```

## Skills Demonstrated

- Modern React Development
- State Management with Context API
- API Integration and Error Handling
- Responsive Web Design
- Component Architecture
- Route Management
- Local Storage Implementation
- Environment Variable Configuration
- Code Organization and Structure
- User Interface Design
- Real-time Data Updates
- Cross-browser Compatibility

## Contributing






[MIT](https://choosealicense.com/licenses/mit/)## LicensePull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
