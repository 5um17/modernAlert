# modernAlert.js #
A small JavaScript snippet to override native js functions **alert**, **confirm** and **prompt**.
It provides customizable HTML pop-ups instead of browser based pop-ups which can be styled using number of arguments and traditional way of using CSS.
### Installation
Include ```modernAlert.min.js``` in the head tag of your project.
```html
<script type="text/javascript" src="./modernAlert.min.js"></script>
```
Call the constructor anywhere in your custom js or head.
```javascript
modernAlert();
```
### Usage
##### Alert
Call basic alert
```javascript
alert('Alert Message');
```
Call alert with custom title
```javascript
alert('Alert Message', 'Title for alert Box');
```
##### Confirm
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
Passing a js variable to callback function
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

##### Prompt
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

### Customization
You can pass color combinations in calling constructor.
Default arguments are:
```javascript
modernAlert({
                backgroundColor: '#fff',
                color: '#555',
                borderColor: '#ccc',
                titleBackgroundColor: '#e8a033',
                titleColor: '#fff'
            });
/* Change the title background color and title color */
modernAlert({
                titleBackgroundColor: 'blue',
                titleColor: 'white'
            });
```

```modernAlert()``` return internal object of itself.

[More](http://www.secretsofgeeks.com)