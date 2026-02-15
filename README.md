# <p align="center"><img src="logo.svg" alt="Iris Logo" width="200"></p>


Flexible library for managing modal dialogs in Bootstrap 5 environments. Written in pure Vanilla JavaScript with no external dependencies.

## Credits

This project was inspired by the [bootstrap3-dialog](https://github.com/nakupanda/bootstrap3-dialog) library. While Iris is an independent implementation written specifically for Bootstrap 5, we acknowledge the influence and excellent design patterns established by that project.
## Table of Contents

- [Examples & Demos](#examples--demos)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Options](#options)
- [Constants](#constants)
- [Methods](#methods)
- [Events](#events)
- [Multi-modal](#multi-modal)
- [Internationalization](#internationalization)

---
## Examples & Demos

<p align="center">
  <a href="https://igorlovric.github.io/iris-examples">
    <img src="https://img.shields.io/badge/View-Live%20Examples-blue?style=for-the-badge&logo=github" alt="Live Examples">
  </a>
</p>

Check out our comprehensive examples covering:
✨ Basic dialogs  
✅ Confirmations  
🔄 AJAX loading  
📚 Multi-modal  
🎯 Draggable  
📝 Forms  
⏱️ Progress indicators  
🌐 Internationalization

**[Explore all examples →](https://igorlovric.github.io/iris-examples)**

---

## Installation

### 1. Include Bootstrap 5
```html
<!-- Bootstrap CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- Bootstrap JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
```

### 2. Add Iris
```html
<!-- Main Iris CSS -->
<link href="path/to/iris.css" rel="stylesheet">

<!-- Main Iris library -->
<script src="path/to/iris.js"></script>

<!-- Optional: Language files (load after iris.js) -->
<script src="path/to/i18n/iris.i18n.sr-RS.js"></script>

<!-- Optional: Iris Theme -->
<link href="themes/flat/iris-flat.css" rel="stylesheet">
```

---

## Quick Start

### Basic Dialog

```javascript

Iris.show({
    title: 'Dialog Title',
    message: '<p>Dialog content</p>',
    buttons: [{
        label: 'OK',
        cssClass: 'btn-primary',
        action: function (dialogRef) {
            dialogRef.close();
        }
    }]
});
```

---

## Options

### Basic Options

| Option            | Type        | Default | Description                                          |
|-------------------|-------------|---------|------------------------------------------------------|
| `id`              | string      | - | Dialog Id                                            |
| `title`           | string      | - | Dialog title                                         |
| `message`         | string/HTML | - | Dialog content                                       |
| `size`            | constant    | `SIZE_NORMAL` | Dialog size                                          |
| `type`            | constant    | `TYPE_DEFAULT` | Dialog type/theme (header color)                     |
| `buttons`         | array       | - | Array of buttons                                     |
| `centered`        | boolean     | false | Vertical centering (cannot be used with `draggable`) |
| `scrollable`      | boolean     | false | Enable scrolling within body                         |
| `draggable`       | boolean     | false | Enable drag & drop (cannot be used with `centered`)  |
| `backdrop`        | boolean     | true | Show backdrop                                        |
| `closeOnBackdrop` | boolean     | true | Close dialog by clicking backdrop                    |
| `keyboard`        | boolean     | true | Close dialog with ESC key                            |
| `closeButton`     | boolean     | true | Show X button in header                              |
| `ajaxUrl`         | string      | - | URL for loading content                              |

### Button Options

Each button in the `buttons` array can have the following properties:

| Property    | Type | Default           | Description                                                                                                                           |
|-------------|------|-------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| `id`        | string | btn_randomString  | Button Id                                                                                                                             |
| `label`     | string | *required*        | Button text to display                                                                                                                |
| `icon`      | string | -                 | Icon class (tested with Bootstrap icons & FontAwesome icon pack)                                                                      |
| `cssClass`  | string | `'btn-secondary'` | Bootstrap button class (e.g., `'btn-primary'`, `'btn-danger'`)                                                                        |
| `action`    | function | -                 | Callback function when button is clicked. Receives `(dialogRef, event)` as parameters. Return `false` to prevent dialog from closing. |
| `autoClose` | boolean | `true`            | Automatically close dialog after action completes (if action doesn't return `false`)                                                  |
| `disabled`  | boolean | `false`           | Whether the button is disabled on render                                                                                              |


#### Button Action Return Values

| Return Value | Behavior |
|--------------|----------|
| `undefined` or `true` | Dialog closes automatically (if `autoClose` is `true`) |
| `false` | Prevents dialog from closing (useful for validation or async operations) |

#### Example
```javascript
buttons: [
    {
        label: 'Save',
        cssClass: 'btn-primary',
        action: function(dialogRef, event) {
            // Your save logic here
            console.log('Save clicked');
        
            // Return false to keep dialog open
            return false;
        }
    }, {
        label: 'Cancel',
        cssClass: 'btn-secondary',
        autoClose: true
        // No action needed - will just close
    }, {
        label: 'Delete',
        cssClass: 'btn-danger',
        disabled: false,
        action: function(dialogRef) {
            if (confirm('Really delete?')) {
            // Delete logic
            dialogRef.close();
        }
        return false; // Prevent auto-close
    }
}]
```

### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `onshow` | `dialogRef` | Called before showing |
| `onshown` | `dialogRef` | Called after showing |
| `onhide` | `dialogRef` | Called before closing (can prevent closing) |
| `onhidden` | `dialogRef` | Called after closing |
| `onContentLoaded` | `dialogRef` | Called after AJAX content loads |

---
## Global Configuration

Iris supports global configuration that applies to all dialog instances in your application.

Set default options for all dialogs:
```javascript
// Configure at app startup
Iris.defaults.closeOnBackdrop = false;  // All dialogs won't close on backdrop click
Iris.defaults.centered = true;          // All dialogs will be centered
Iris.defaults.size = Iris.SIZE_LARGE;   // All dialogs will be large
// All dialogs created after this will use these defaults

// Individual dialogs can still override
dialog.show({
    title: 'Special Dialog',
    closeOnBackdrop: true  // This one can close on backdrop
});
```
---
## Constants

### Sizes (SIZE)

```javascript
Iris.SIZE_SMALL       // modal-sm
Iris.SIZE_NORMAL      // (default)
Iris.SIZE_LARGE       // modal-lg
Iris.SIZE_XLARGE      // modal-xl
Iris.SIZE_FULLWIDTH   // modal-fullwidth
Iris.SIZE_FULLSCREEN  // modal-fullscreen
```

### Types (TYPE)

```javascript
Iris.TYPE_DEFAULT     // No special color
Iris.TYPE_PRIMARY     // Blue header
Iris.TYPE_SUCCESS     // Green header
Iris.TYPE_INFO        // Light blue header
Iris.TYPE_WARNING     // Yellow header
Iris.TYPE_DANGER      // Red header
Iris.TYPE_DARK        // Dark header
```

---

## Methods

### show(options)
Displays the dialog with given options.
```javascript
var dialog=Iris.show({
    title: 'Title',
    message: 'Message',
    buttons: [{
        label: 'Ok',
        cssClass: 'btn-primary',
        action: function (dialogRef) {
            dialogRef.close();
        }
    }]
});
```

### close(force)
Closes the dialog.
```javascript
dialog.close();        // Normal close (calls onhide)
dialog.close(true);    // Forced close (skips onhide)
```

### getModalBody()
Returns the DOM element of the dialog body.
```javascript
const body = dialog.getModalBody();
```

### getModalFooter()
Returns the DOM element of the dialog footer.
```javascript
const footer = dialog.getModalFooter();
```

### getModalHeader()
Returns the DOM element of the dialog header.
```javascript
const header = dialog.getModalHeader();
```

### setTitle(title)
Changes the dialog title.
```javascript
dialog.setTitle('New Title');
```

### setContent(content)
Changes the dialog body content.
```javascript
dialog.setContent('<p>New content</p>');
```

### setType(type)
Changes the dialog type/color.

```javascript
dialog.setType(Iris.TYPE_SUCCESS);
```

### enableButton(index)
Enables the button at given index.
```javascript
dialog.enableButton(0); // Enable first button
```

### disableButton(index)
Disables the button at given index.
```javascript
dialog.disableButton(0); // Disable first button
```

### setClosable(closable)
Enables or disables the ability to close the dialog. When set to `false`, disables all closing methods (backdrop click, ESC key, close button, footer buttons). When set back to `true`, restores only the originally enabled closing methods.
```javascript
// Prevent closing during processing
dialog.setClosable(false);

// Restore original closing behavior
dialog.setClosable(true);
```

**Common use case:** Prevent users from accidentally closing dialogs during AJAX requests or critical operations.
```javascript
dialog.setClosable(false);
fetch('/api/save')
    .then(() => {
        dialog.setClosable(true);
        dialog.close();
    })
    .catch(() => dialog.setClosable(true));
```

### enableButtons(enable)
Enables or disables all buttons in the dialog footer.
```javascript
// Disable all buttons
dialog.enableButtons(false);

// Enable all buttons
dialog.enableButtons(true);
```

**Common use case:** Prevent multiple form submissions during processing.
```javascript
dialog.enableButtons(false);
fetch('/api/submit')
    .finally(() => dialog.enableButtons(true));
```

### loadContent(url, params)
Loads content via AJAX.
```javascript
dialog.loadContent('users/form', { id: 123 });
```

---

## Events

### onshow
Called **before** the dialog is shown.
```javascript
onshow: function(dialogRef) {
    console.log('Dialog is preparing to show');
}
```

### onshown
Called **after** the dialog is fully shown.
```javascript
onshown: function(dialogRef) {
    console.log('Dialog is shown');
    // Good time to focus fields, initialize plugins, etc.
    dialogRef.getModalBody().querySelector('input').focus();
}
```

### onhide
Called **before** closing the dialog. Can prevent closing by returning `false`.
```javascript
onhide: function(dialogRef) {
    const form = dialogRef.getModalBody().querySelector('form');
    
    if (form.classList.contains('dirty')) {
        const shouldClose = confirm('You have unsaved changes. Close anyway?');
        return shouldClose; // false = prevents closing
    }
    
    return true; // true = allows closing
}
```

### onhidden
Called **after** the dialog is fully closed and removed from DOM.
```javascript
onhidden: function(dialogRef) {
    console.log('Dialog is closed and removed');
    // Cleanup code here
}
```

### onContentLoaded
Called after successful AJAX content loading.
```javascript
onContentLoaded: function(dialogRef) {
    console.log('AJAX content loaded');
    
    // Initialize validation, datepickers, etc.
    const form = dialogRef.getModalBody().querySelector('form');
    initFormValidation(form);
}
```

---

## Multi-modal

Iris supports multiple dialogs open simultaneously with automatic z-index management.

```javascript
// First dialog
Iris.show({
    title: 'First Dialog',
    message: '<p>Content of first dialog</p>',
    type: Iris.TYPE_SUCCESS,
    size: Iris.SIZE_NORMAL,
    draggable: true, 
    buttons: [{
        label: 'Open Second Dialog',
        cssClass: 'btn-primary',
        action: function () {
            // Second dialog
            Iris.show({
                title: 'Second Dialog',
                message: '<p>Content of second dialog</p>',
                type: Iris.TYPE_INFO,
                size: Iris.SIZE_SMALL,
                draggable: true,
                buttons: [{
                    label: 'Close',
                    cssClass: 'btn-secondary'
                }]
            });
            
            return false; // Don't close first dialog
        }
    }]
});
```
---

## Internationalization

Iris includes built-in internationalization (i18n) support with English as the default language.

### Setting Language

```javascript
// Set language (if language file is loaded)
Iris.setLanguage('sr-RS');

// Get available languages
console.log(Iris.getAvailableLanguages());
// Output: [{code: 'en-US', name: 'English (United States)'}, {code: 'sr-RS', name: 'Srpski (Srbija)'}]
```

### Using Translations

```javascript
// Use translations in dialog

const dialog=Iris.show({
    title: Iris.t('warning'),
    message: Iris.t('confirmDelete'),
    buttons: [
        {
            label: Iris.t('cancel'),
            cssClass: 'btn-secondary'
        },
        {
            label: Iris.t('delete'),
            cssClass: 'btn-danger'
        }
    ]
});
```
### Creating Custom Language Files

Create a file named `iris.i18n.{language-code}.js`:

```javascript
// iris.i18n.de-DE.js
Iris.i18n['de-DE'] = {
    code: 'de-DE',
    name: 'Deutsch (Deutschland)',
    translations: {
        loading: 'Wird geladen...',
        close: 'Schließen',
        cancel: 'Abbrechen',
        ok: 'OK',
        yes: 'Ja',
        no: 'Nein',
        confirm: 'Bestätigen',
        delete: 'Löschen',
        save: 'Speichern',
        error: 'Fehler',
        warning: 'Warnung',
        success: 'Erfolg',
        info: 'Information',
        loadError: 'Fehler beim Laden des Inhalts: {0}',
        confirmDelete: 'Möchten Sie dieses Element wirklich löschen?',
        confirmAction: 'Möchten Sie wirklich fortfahren?'
    }
};
```

Load after iris.js:
```html
<script src="js/iris.js"></script>
<script src="js/i18n/iris.i18n.de-DE.js"></script>
```

---

## Tips & Tricks

### Access Dialog Instance

```javascript

const dialog=Iris.show({});
dialog.close();
```

### Auto-close After Timeout

```javascript
const dialog=Iris.show({
    title: 'Auto-close',
    message: '<p>This dialog will automatically close in 5 seconds</p>',
    type: Iris.TYPE_INFO
});

setTimeout(() => {
    dialog.close();
}, 5000);
```
---

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
---

## License

MIT License

