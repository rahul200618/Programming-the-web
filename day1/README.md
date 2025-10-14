# Book Club Registration Form

This repository contains a simple HTML form (`book-club-form.html`) designed for users to register for a book club. It collects basic information, reading preferences, and personal favorites related to books.

## Form Fields

The form includes the following fields for the user to fill out:

-   **Full Name**: A required text input for the user's full name.
-   **Email Address**: A required email input for the user's contact email.
-   **Favorite Genres**: A set of checkboxes allowing users to select multiple genres they enjoy (e.g., Fiction, Mystery, Sci-Fi).
-   **Reading Frequency**: A set of radio buttons for users to indicate how often they read (e.g., Daily, Weekly, Occasionally).
-   **Favorite Author**: An optional text input for the user's favorite author.
-   **Why do you love reading?**: A textarea for users to provide a personal reason for their love of reading.

## How to Use

1.  Open the `book-club-form.html` file in any modern web browser.
2.  Fill out the form fields.
3.  Click the "Submit" button.

**Note**: The form's `action` attribute is currently set to `"#"` and the `method` is `"post"`. This is a placeholder. To make the form functional, the `action` attribute should be updated to point to a backend script (e.g., a PHP, Python, or Node.js endpoint) that can process the submitted form data.

## Code Quality & Potential Improvements

The current HTML file is a great starting point, but it has some structural issues and could be improved for better standards compliance, accessibility, and user experience.

### 1. HTML Structure

The HTML document is missing some fundamental tags. The `<form>` is incorrectly placed inside the `<head>`, and the `<body>` tag is missing entirely.

**Recommendation**:
Wrap the entire document in a `<!DOCTYPE html>` declaration and an `<html>` tag. The `<head>` should contain metadata like `<meta>` and `<title>`, and the `<form>` should be moved inside a `<body>` tag.

### 2. Accessibility and Semantics

Grouping related form elements can improve accessibility for screen reader users and make the form's structure more logical.

**Recommendation**:
Use the `<fieldset>` element to group the checkbox and radio button sections. Use a `<legend>` tag inside each `<fieldset>` to describe the group (e.g., "Favorite Genres").

### 3. Styling

The form is currently unstyled. Applying CSS would significantly improve its visual appeal and layout.

**Recommendation**:
Create a separate `.css` file and link it in the `<head>` of the HTML document. Use CSS to style labels, inputs, and buttons, and to create a more organized layout (e.g., using Flexbox or Grid).

### 4. User Experience

The `<br>` tags used for spacing are functional but not ideal for layout control.

**Recommendation**:
Wrap each `label`/`input` pair in a `<div>` and use CSS `margin` or `padding` for spacing. This provides more control and is better practice for modern web development.
