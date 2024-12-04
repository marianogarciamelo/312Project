# 312Project

Open Source Software Project

# Financial Planner

## Mission Statement

Our mission is to empower individuals with accessible, intuitive, and transparent tools for financial planning. Through our open-source financial planner, we aim to foster financial literacy, promote informed decision-making, and provide robust stock tracking and budgeting features, all while embracing collaboration, innovation, and community-driven development.

## Overview

The Financial Planner is a web-based application designed to help users manage their personal finances. It provides features for budgeting, setting financial goals, tracking investments, and accessing educational resources. The project is structured with HTML, CSS, and JavaScript, utilizing Chart.js for data visualization.

## Features

- **Budget Management**: Track monthly income, set budget categories, and monitor expenses visually through pie charts.
- **Goal Tracking**: Define financial goals, monitor progress, and stay motivated with visual progress indicators.
- **Investment Tracking**: Log investments, view growth over time with dynamic line charts, and add updates.
- **Financial Resources**: Access curated links to financial literacy resources, tools, and calculators.

## File Structure

- `index.html`: Homepage with an overview of the application and access to login/register modals.
- `budget.html`: Page for managing budgets.
- `goals.html`: Page to define and track progress toward financial goals.
- `investments.html`: Page for logging and visualizing investments over time.
- `resources.html`: Page with curated financial resources and links.
- `app.js`: JavaScript for dynamic functionality, including handling forms, updating charts, and managing data.
- `style.css`: Stylesheet for consistent and responsive design.

## Technologies Used

- **HTML5 & CSS3**: Markup and styling for a responsive user interface.
- **JavaScript**: Frontend scripting for interactivity and dynamic data handling.
- **Chart.js**: Library for creating interactive and visually appealing charts.
- **Google Fonts**: Roboto font for a clean and modern look.

## Contribution Guidelines

We welcome contributions! Please fork the repository, create a feature branch, and submit a pull request with a detailed description of your changes.

For each feature added it is necesary to update the `DOCS.md` file

## Testing Contributions

Before submitting a pull request, contributors must test their additions to ensure they work seamlessly with existing features. Here’s how to test your contributions:

### Local Setup

- Ensure you’ve cloned the repository and set up a local server to view the application in your browser.

### Unit Testing

- For any JavaScript functionality you add, include unit tests where applicable.
- Use the browser’s developer tools (Console, Network, etc.) to verify functionality and troubleshoot issues.

### Feature Testing

- **Budget Management**: Ensure budget categories, income, and expenses can be added, updated, and displayed correctly in pie charts.
- **Goal Tracking**: Add financial goals and verify that progress is tracked and displayed with appropriate visual indicators.
- **Investment Tracking**: Test adding, editing, and visualizing investments. Confirm the line charts update dynamically and accurately.
- **Financial Resources**: Check all added resources for broken links and ensure they open correctly in a new tab.

### Cross-Feature Testing

- Confirm your changes do not negatively affect other features.
- Example: If you modify `app.js`, verify that changes to investment tracking don’t interfere with budget tracking.

### Responsive Design

- Test the application on different screen sizes to ensure it remains responsive and visually consistent.

### Browser Compatibility

- Verify the application works correctly on major browsers (e.g., Chrome, Firefox, Safari).
