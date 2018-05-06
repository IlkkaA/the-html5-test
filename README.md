# HTML5 test app

### General description of the app
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

I created it according to instructions at: https://digiaonline.github.io/html5-test/

Deployed at: https://the-html5-test.000webhostapp.com/ (page is down 1h per day)

Downloadable from: https://github.com/IlkkaA/the-html5-test.git

### node packages installed to this app
* axios (for API call)
* uuid (for creating unique keys)
* node-sass-chokidar & npm-run-all (for using Sass CSS preprocessor. Because using Sass, .css-files are gitignored. [See installation quide](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-css-preprocessor-sass-less-etc))

### Short description of the main functions at App.js
* **ComponentDidMount** - after the site is rendered in browser, uses Axios to get JSON-data of 20 participants from Mockaroo site. Sets all boolean values to false in the data and sets the data as participants and editedParticipants state. Renders the data in the site. Also generates one new unique Uuid key to be used when new participant is created.
* **handleNewParticipants** - takes values from the visible inputs on the page (at newParticipantForm component). Checks (at validateField) written text and if all fields are valid allows to create new participant (at toggleSubmitButton and newParticipantHandler)
* **startParticipantEditing** - Collects the original data from the row to be used possibly with Cancel button. Puts edit mode on for the clicked participant row (in TableBodyRow component).
* **endParticipantEditing** - When Save button is clicked on participant table row, returns the participant row into non-editable form.
* **handleParticipantInputEdit** - handles the text written on the inputs on edited row i.e. updates the input data.
* **cancelEditing** - if user wants to cancel the participant editing and return the original values when editing was started, this function returns the values back to the fiend and stops editing. Also makes all other participant editable.
* **removeParticipant** - removes the chosen participant, i.e. one participant table row.
* **sortRowsBy** - when participant table header fields are clicked, sets the participants  alphabetically/numerically in ascending or descending order. uses simpleSort function and sortDirArrow variable in this action.

### Things that maybe need update
* It would be good if a more experienced developer checked function at App.js if the code is according to good React coding standards :) If not, the function can be updated. But at it's current form the function works and throws no errors.
* Now input validation is done only when new participant is being added but not when the participants in the ParticipantTable are being edited. Possibly useful to connect validateField function to the ParticipantTable edits.
* Now all participants have unique Uuid key, but the keys dont have a real function in this app, I just created them according to the instructions. Removing these keys is possible if they really are not needed.
* The only thing I've noticed that are not in this app according to the instuctions are the font weights on h1, p, input elements.
