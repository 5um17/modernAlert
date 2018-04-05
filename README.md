# modernAlert.js #
A small JavaScript snippet for customizable **alert**, **confirm** and **prompt** functions.
It provides customizable HTML pop-ups instead of browser based pop-ups which can be styled using number of arguments and traditional way of using CSS. 

By default native functions are replaced with modernAlert functions but this can be [turned off](https://github.com/5um17/modernAlert#disable-native-functions-overriding) in the constructor.

## [Demo](https://www.secretsofgeeks.com/2015/09/modernAlert.html#modernAlertExamples)

## Installation
Download the stable version of modernAlert from [here](https://github.com/5um17/modernAlert/releases) OR development version from [here](https://github.com/5um17/modernAlert/archive/master.zip)

Include ```modernAlert.min.js``` in the head tag of your project.
```html
<script type="text/javascript" src="./modernAlert.min.js"></script>
```
Call the constructor anywhere in your custom js or head only once.
```javascript
modernAlert();
```
## Usage
### Alert
Call basic alert
```javascript
alert('Alert Message');
```
Call alert with custom title
```javascript
alert('Alert Message', 'Title for alert Box');
```
Call alert with callback and with a variable
```javascript
alert('Alert Message', 'Title for alert Box', callback_function, new Date());

/* Define your callback function */
function callback_function(valueFromAlert, time) { 
    if (valueFromAlert === true) {
        console.log('This alert was called at ' + time.toString());
    }
}
```
### Confirm
Call basic Confirm
```javascript
confirm('Confirm Message', 'Confirm title', callback_function);

/* Define your callback function */
function callback_function(valueFromConfirm) { 
    if (valueFromConfirm === true) {
        console.log('User clicked yes');
    } else {
        console.log('User clicked no');
    }
}
```
Passing a variable to callback function
```javascript
confirm('Confirm Message', 'Confirm title', callback_function, 'confirmID: 01');

/* Define your callback function */
function callback_function(valueFromConfirm, extra_var) { 
    if (valueFromConfirm === true) {
        console.log('User clicked yes and confirmID: ' + extra_var);
    } else {
        console.log('User clicked no and confirmID: ' + extra_var);
    }
}
```

### Prompt
Call the simple prompt
```javascript
prompt('Prompt Message', 'Prompt title', callback_function);

/* Define your callback function */
function callback_function(valueFromPrompt) { 
    console.log('User enterd: ' + valueFromPrompt);
}
```
Passing a js variable to callback function
```javascript
prompt('Prompt Message', 'Prompt title', callback_function, new Date());

/* Define your callback function */
function callback_function(valueFromPrompt, promptTime) { 
    console.log('User enterd: ' + valueFromPrompt + ' and prompt time was: ' + promptTime.toString());
}
```

## Disable native functions overriding
You can disable the native functions overriding and can use native alert, confirm and prompt functions altogether with modernAlert functions.

When calling constructor pass `overrideNative` with `false`.
```javascript
modernAlert({
                overrideNative: false
            });
```

Call any function using global variable `modernAlert`
```javascript
modernAlert.alert('Alert Message', 'Title for alert Box');
modernAlert.confirm('Confirm Message', 'Confirm title', callback_function);
modernAlert.prompt('Prompt Message', 'Prompt title', callback_function);
``` 
***NOTE:*** No matter if `overrideNative` set to `false` or `true` you can always use `modernAlert.alert` syntax. 

## Customization
You can pass color combinations and other settings in calling constructor.
Default arguments are:
```javascript
/* Default arguments */
modernAlert({
                backgroundColor: '#fff',
                color: '#555',
                borderColor: '#ccc',
                titleBackgroundColor: '#e8a033',
                titleColor: '#fff',
                defaultButtonsText: {ok : 'Ok', cancel : 'Cancel'},
                overlayColor: 'rgba(0, 0, 0, 0.5)',
                overlayBlur: 2, //Set false to disable it or interger for pixle
                overrideNative: true
            });
```            

Change the title background color and title color
```javascript
modernAlert({
                titleBackgroundColor: 'blue',
                titleColor: 'white'
            });
```            
            
Change overlay color
```javascript
modernAlert({
                overlayColor: 'rgba(255, 255, 255, 0.3)'
            });
```

Disable background blur
```javascript
modernAlert({
                overlayBlur: false
            });
            
```
### Changing buttons label

Change buttons label for all functions
```javascript
modernAlert({
                defaultButtonsText: {ok : 'textForOkButton', cancel : 'textForCancelButton'}
            });
```

Change buttons label for single function
```javascript
alert('Confirm Message', 'Confirm title', null, null, {ok : 'textForOkButton', cancel : 'textForCancelButton'});
confirm('Confirm Message', 'Confirm title', callback_function, null, {ok : 'textForOkButton', cancel : 'textForCancelButton'});
```

```modernAlert()``` return internal object.