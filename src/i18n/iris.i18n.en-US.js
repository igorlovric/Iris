// DialogManager Internationalization - English (United States)
// Language code: en-US (ISO 639-1 + ISO 3166-1)

if (typeof Iris === 'undefined') {
    window.DialogManager = {};
}

Iris.i18n = Iris.i18n || {};

Iris.i18n['en-US'] = {
    code: 'en-US',
    name: 'English (United States)',
    translations: {
        loading: 'Loading...',
        close: 'Close',
        cancel: 'Cancel',
        ok: 'OK',
        yes: 'Yes',
        no: 'No',
        confirm: 'Confirm',
        prompt: 'Enter Value',
        delete: 'Delete',
        save: 'Save',
        error: 'Error',
        warning: 'Warning',
        success: 'Success',
        info: 'Information',
        loadError: 'Error loading content: {0}',
        confirmDelete: 'Are you sure you want to delete this item?',
        confirmAction: 'Are you sure you want to proceed?'
    }
};

// Set as default if no language is set
Iris.currentLanguage = Iris.currentLanguage || 'en-US';
