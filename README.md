# <p align="center"><img src="logo.svg" alt="Iris Logo" width="200"></p>


Flexible library for managing modal dialogs in Bootstrap 5 environments. Written in pure Vanilla JavaScript with no external dependencies.

![Version](https://img.shields.io/badge/version-1.1.2-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Bootstrap](https://img.shields.io/badge/bootstrap-5.x-purple)

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
- [Minimizing Dialogs](#minimizing-dialogs)
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

| Option            | Type        | Default                            | Description                                                                           |
|-------------------|-------------|------------------------------------|---------------------------------------------------------------------------------------|
| `id`              | string      | -                                  | Dialog Id                                                                             |
| `title`           | string      | -                                  | Dialog title                                                                          |
| `message`         | string/HTML | -                                  | Dialog content                                                                        |
| `size`            | constant    | `SIZE_NORMAL`                      | Dialog size                                                                           |
| `type`            | constant    | `TYPE_DEFAULT`                     | Dialog type/theme (header color)                                                      |
| `buttons`         | array       | -                                  | Array of buttons                                                                      |
| `centered`        | boolean     | false                              | Vertical centering (cannot be used with `draggable`)                                  |
| `scrollable`      | boolean     | false                              | Enable scrolling within body                                                          |
| `draggable`       | boolean     | false                              | Enable drag & drop (cannot be used with `centered`)                                   |
| `minimizable`     | boolean     | false                              | Enable minimize of dialog                                                             |
| `backdrop`        | boolean     | true                               | Show backdrop                                                                         |
| `closeOnBackdrop` | boolean     | true                               | Close dialog by clicking backdrop                                                     |
| `keyboard`        | boolean     | true                               | Close dialog with ESC key                                                             |
| `closeButton`     | boolean     | true                               | Show X button in header                                                               |
| `ajaxUrl`         | string      | -                                  | URL for loading content                                                               |
| `spinIcon`        | string      | `spinner-border spinner-border-sm` | Spinner icon class. If you are using FontAwesome, you can use `fa fa-spinner fa-spin` |
| `thene`           | string      | -                                  | Theme to apply (eg. 'flat')                                                           |

### Button Options

Each button in the `buttons` array can have the following properties:

| Property     | Type     | Default           | Description                                                                                                                           |
|--------------|----------|-------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| `id`         | string   | btn_randomString  | Button Id                                                                                                                             |
| `label`      | string   | *required*        | Button text to display                                                                                                                |
| `icon`       | string   | -                 | Icon class (tested with Bootstrap icons & FontAwesome icon pack)                                                                      |
| `cssClass`   | string   | `'btn-secondary'` | Bootstrap button class (e.g., `'btn-primary'`, `'btn-danger'`)                                                                        |
| `action`     | function | -                 | Callback function when button is clicked. Receives `(dialogRef, event)` as parameters. Return `false` to prevent dialog from closing. |
| `autoClose`  | boolean  | `true`            | Automatically close dialog after action completes (if action doesn't return `false`)                                                  |
| `disabled`   | boolean  | `false`           | Whether the button is disabled on render                                                                                              |
| `autoSpin`   | boolean  | `false`           | Automatically show spinner when button is clicked |

#### Button Action Return Values

| Return Value          | Behavior                                                                 |
|-----------------------|--------------------------------------------------------------------------|
| `undefined` or `true` | Dialog closes automatically (if `autoClose` is `true`)                   |
| `false`               | Prevents dialog from closing (useful for validation or async operations) |

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

| Event             | Parameters  | Description                                 |
|-------------------|-------------|---------------------------------------------|
| `onshow`          | `dialogRef` | Called before showing                       |
| `onshown`         | `dialogRef` | Called after showing                        |
| `onhide`          | `dialogRef` | Called before closing (can prevent closing) |
| `onhidden`        | `dialogRef` | Called after closing                        |
| `onContentLoaded` | `dialogRef` | Called after AJAX content loads             |

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

### enableButton(identifier)
Enables the button.

**Parameters:**
- `identifier` - Button index (0-based), button ID, or button label

```javascript
dialog.enableButton(0); // Enable first button
```

### disableButton(identifier)
Disables the button.

**Parameters:**
- `identifier` - Button index (0-based), button ID, or button label
- 
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

### buttonSpin(identifier, spin)
Starts or stops a spinner animation on a button. Useful for showing loading state during async operations.
```javascript
// Start spinner
dialog.buttonSpin(0, true);

// Stop spinner
dialog.buttonSpin(0, false);
```

**Parameters:**
- `identifier` - Button index (0-based), button ID, or button label
- `spin` - `true` to start spinner, `false` to stop

**Common use case:**
```javascript
buttons: [{
    label: 'Save',
    autoSpin: true,  // Auto-start spinner on click
    action: function(dialogRef) {
        fetch('/api/save')
            .then(() => dialogRef.close())
            .catch(() => dialogRef.buttonSpin(0, false)); // Stop on error
        return false;
    }
}]
```

### buttonSpinAll(spin)
Starts or stops spinner on all buttons simultaneously.
```javascript
dialog.buttonSpinAll(true);   // Start all spinners
dialog.buttonSpinAll(false);  // Stop all spinners
```

### minimize()
Minimizes the dialog and adds it to the taskbar.
```javascript
dialog.minimize();
```

**Requirements:**
- Dialog must have `minimizable: true`
- Cannot minimize if there are other dialogs above it (multi-modal scenario)

**What gets preserved:**
- Scroll position
- Form input values
- Draggable position (if draggable)
- Dialog state

### restore()
Restores a minimized dialog to the screen.
```javascript
dialog.restore();
```

The dialog returns to its previous state and position.

### isMinimized()
Returns whether the dialog is currently minimized.
```javascript
if (dialog.isMinimized()) {
    console.log('Dialog is minimized');
}
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

### onminimize
Called when the dialog is minimized.
```javascript
onminimize: function(dialogRef) {
    console.log('Dialog minimized:', dialogRef.options.title);
    // Save state, log analytics, etc.
}
```

### onrestore
Called when the dialog is restored from minimized state.
```javascript
onrestore: function(dialogRef) {
    console.log('Dialog restored:', dialogRef.options.title);
    // Refresh data, re-focus inputs, etc.
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
## Minimizing Dialogs

Iris supports minimizing dialogs to a floating taskbar. Minimized dialogs preserve their state (scroll position, form data, draggable position) and can be quickly restored.

### Enable Minimizable Dialog
```javascript
Iris.show({
    title: 'Task Manager',
    message: 'Long form content...',
    minimizable: true,  // Enable minimize button in header
    draggable: true,    // Position will be preserved when restored
    buttons: [{
        label: 'Save',
        cssClass: 'btn-primary'
    }]
});
```

Or set globally:
```javascript
Iris.defaults.minimizable = true;  // All dialogs can be minimized
```

### Minimize Button

When `minimizable: true`, a minimize button (−) appears in the modal header, next to the close button.
```javascript
Iris.show({
    title: 'Edit User',
    minimizable: true,
    closeButton: true,  // Both minimize and close buttons visible
    // ...
});
```

### Floating Taskbar

When dialogs are minimized, a floating taskbar button appears in the corner of the screen:

- **Badge** shows the number of minimized dialogs
- **Click** to open the list of minimized dialogs
- **List** displays all minimized dialogs with their titles and icons
- **Restore** a dialog by clicking on it in the list
- **Close** a minimized dialog using the × button in the list

The taskbar automatically:
- Appears when first dialog is minimized
- Disappears when all dialogs are closed or restored
- Manages z-index automatically
- Preserves backdrop state

### Methods

#### minimize()
Minimizes the dialog and adds it to the taskbar.
```javascript
dialog.minimize();
```

**Requirements:**
- Dialog must have `minimizable: true`
- Cannot minimize if there are other dialogs above it (multi-modal scenario)

**What gets preserved:**
- Scroll position
- Form input values
- Draggable position (if draggable)
- Dialog state

#### restore()
Restores a minimized dialog to the screen.
```javascript
dialog.restore();
```

The dialog returns to its previous state and position.

#### isMinimized()
Returns whether the dialog is currently minimized.
```javascript
if (dialog.isMinimized()) {
    console.log('Dialog is minimized');
}
```

### Taskbar Configuration

Customize the floating taskbar appearance and position:
```javascript
// Position: 'bottom-right', 'bottom-left', 'top-right', 'top-left'
Iris.taskbarPosition = 'bottom-right';  // Default

// Distance from screen edge (pixels)
Iris.taskbarOffset = 20;  // Default

// Z-index (should be very high)
Iris.taskbarZIndex = 999999;  // Default

// Taskbar button color (any CSS color)
Iris.taskbarButtonColor = '#6c757d';  // Default (Bootstrap secondary)

// Maximum height of minimized dialogs list (pixels)
Iris.taskbarMaxHeight = 300;  // Default

// Taskbar button size (pixels)
Iris.taskbarButtonSize = 60;  // Default
```

**Example: Move taskbar to top-left with custom color**
```javascript
Iris.taskbarPosition = 'top-left';
Iris.taskbarButtonColor = '#0d6efd';  // Bootstrap primary blue
Iris.taskbarOffset = 30;
```

### Events

#### onminimize
Called when the dialog is minimized.
```javascript
onminimize: function(dialogRef) {
    console.log('Dialog minimized:', dialogRef.options.title);
    // Save state, log analytics, etc.
}
```

#### onrestore
Called when the dialog is restored from minimized state.
```javascript
onrestore: function(dialogRef) {
    console.log('Dialog restored:', dialogRef.options.title);
    // Refresh data, re-focus inputs, etc.
}
```
### Styling the Taskbar

You can customize the taskbar appearance by overriding CSS classes:
```css
/* Customize taskbar button */
#irisTaskbarButton {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    width: 70px;
    height: 70px;
}

/* Customize badge */
.iris-taskbar-badge {
    background: #ff6b6b;
    font-size: 14px;
}

/* Customize list items */
.iris-taskbar-item {
    border-left: 3px solid transparent;
}

.iris-taskbar-item:hover {
    background-color: #e3f2fd;
    border-left-color: #2196f3;
}

/* Customize minimize button in header */
.btn-minimize {
    font-size: 28px;
    font-weight: bold;
}
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

