# UX Engineering Test

## A challenge for UX engineers

While this app does technically work it is lacking in both UI design and UX. That's where you come in!

For this test you will be updating the design and applying whatever CSS wizardry you think would make it better.

We will be looking specifically at what you choose to do and how you choose to do it.

Feel free to use libraries like Tailwind. You might also want to move some of the components into their own files/folders.

## Submitting your solution

Clone this repository and set up your own, new repository as the origin remote.

Once your remote repository is ready, add @ckortekaas and @nathanhoad and let us know that you've completed the challenge.

## Your comments

### Demo

See a demo of this app at [https://shorthand-ux-test-seano.surge.sh](https://shorthand-ux-test-seano.surge.sh)

### Issues

This CRA project doesn't compile when running Node v18. To get it to work I needed to add the flag `--openssl-legacy-provider`

### Code changes

- Refactored components
- Added SPA routing (for proper browser history and bookmarking)
- Added DayJS for date formatting
- Added Seasons to the Show view

### Styles

- Nothing crazy on the styling, simple and effective
- Chose to not use any CSS libraries like Tailwind. Not a fan of polluting HTML with tons of helper classes and enjoy writing CSS,
- Chose SASS for nested styles and partials imports but could easily just be regular CSS
- Used some more recent techniques such as CSS Grid, aspect-ratio (to prevent CLS while images are loading), scroll-snap (for Seasons carousel)

### UX Enhancements

- Search as you type, with debouncing so we don't hammer the API
- Your search query is added to the URL as you type. Loading a page with `?search=xxx` will automatically trigger a search
- For the main Show image, I used set the smaller image as a background so the area isn't blank while the larger image loads
- Adding routing really helps with user navigation. SPA routing has it's quirks compared to server-side, but it's good enough
- Considered mobile layout eg. when the Show page collapses to a single column the elements reorder as Title -> Image -> Content
- Handling edge-cases from the API eg. show without a premier date

#### Other additions:

Good UX should also delight users, so I added a few superfluous things:

- shiny show posters on hover
- staggered transitions when show list loads
- playful copy when no shows are found

### Accessibility

- Checked with the WebAim WAVE tool - no accessibility issues
- Scores 100% Accessibility on Lighthouse
- Mainly tested in Chrome

---

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
