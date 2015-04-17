/**
 * modernAlert - JavaScript snippet to override native js functions alert, confirm, prompt.
 * Native functions are replaced with customizable pop-ups.  
 *
 * @author Sumit Singh
 * @version 1.0
 **/
(function (){
    this.modernAlert = function () {
        var modernAlert = {
            /**
             * Init the script, assign custom functions to window object
             * @returns {object} modelAlert
             */
            init : function () {
                    if (typeof arguments[0] === 'object') {
                       for (var key in arguments[0]) {
                            if (this.args.hasOwnProperty(key)) {
                                this.args[key] = arguments[0][key];
                            }
                        }
                    }
                    this.head.insertBefore(this.getStyleTag(), this.head.firstChild);
                    window.alert = this.alert;
                    window.confirm = this.confirm;
                    window.prompt = this.prompt;
                    return this;
            },
            
            /**
             * Defualt arguments
             */
            args : {
                backgroundColor: '#fff',
                color: '#555',
                borderColor: '#ccc',
                titleBackgroundColor: '#e8a033',
                titleColor: '#fff',
                defaultButtonsText: {ok : 'Ok', cancel : 'Cancel'}
            },
            
            /**
             * Get head tag
             */
            head : document.head || document.getElementsByTagName('head')[0],
            
            /**
             * get style tag with CSS
             * @returns {object} style element
             */
            getStyleTag : function (){
                var styleTag = document.createElement('style');
                styleTag.type = 'text/css';
                styleTag.appendChild(document.createTextNode(this.getCSS()));
                return styleTag;
            },
            
            /**
             * build CSS based on user arguments
             * @returns {string} CSS for mordenAlert
             */
            getCSS : function () {
                var css = ".modernAlertWrapper {background: "+this.args.backgroundColor+"; color: "+this.args.color+"; border: 1px solid "+this.args.borderColor+"; box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); left: 50%; min-height: 120px; min-width: 240px; position: fixed; text-align: center; top: 50%; z-index: 999;font-size:14px;padding-bottom: 15px;}";
                css += ".modernAlertWrapper h4 {background: "+this.args.titleBackgroundColor+"; color: "+this.args.titleColor+"; margin: 0; padding: 5px; font-size:16px;}";
                css += ".modernAlertWrapper p {margin: 0;padding: 5px 10px;}";
                css += ".maInputWrapper input {width: 100%; max-width: 300px;}";
                return css;
            },
            
            /**
             * extract arguments and assign default value for keys msg, title, callback, extra_var, buttons
             * @param {array} arguments
             * @param {string} type of calling function
             * @returns {Object} args
             */
            extract_vars : function (fun_args, type) {
                type = typeof type !== 'undefined' ? type : 'confirm';
                var args = new Object();
                
                args.msg = fun_args[0] || '';
                args.title = fun_args[1] || 'Message';
                if (type === 'alert') {
                    args.extra_var = typeof fun_args[2] !== 'undefined' ? fun_args[2] : 'You can use this var by passing value as fourth parameter in confirm function.';
                    args.buttons = typeof fun_args[3] === 'object' ? fun_args[3] : this.args.defaultButtonsText;
                } else {
                    args.callback = typeof fun_args[2] === 'function' ? fun_args[2] : function () { console.warn('Callback function is missing!'); };
                    args.extra_var = typeof fun_args[3] !== 'undefined' ? fun_args[3] : 'You can use this var by passing value as fourth parameter in confirm function.';
                    args.buttons = typeof fun_args[4] === 'object' ? fun_args[4] : this.args.defaultButtonsText;
                }
                
                return args;
            },
            
            /**
             * Custom alert function
             * @returns {NULL}
             */
            alert : function () {
                var args, html;
                args = modernAlert.extract_vars(arguments, 'alert');
                html = '<h4>'+args.title+'</h4><p>'+args.msg+'</p><input class="button btn btn-default" onclick="this.parentNode.remove();" type="button" value="'+ args.buttons.ok +'" />';
                modernAlert.createInsertHtml('div', 'modernAlertWrapper', html);
            },
            
            /**
             * Custom confirm function
             * @returns {NULL}
             */
            confirm : function () {
                var args, html, wrapper, inputYes, inputNo;
                
                args = modernAlert.extract_vars(arguments);
                html = '<h4>'+args.title+'</h4><p>'+args.msg+'</p>\n\
                <input class="button btn btn-default maYes" type="button" value="'+ args.buttons.ok +'" />\n\
                <input class="button btn btn-default maNo" type="button" value="'+ args.buttons.cancel +'" />';
                
                wrapper = modernAlert.createInsertHtml('div', 'modernAlertWrapper', html);
                
                inputYes = wrapper.getElementsByClassName('maYes');
                inputNo = wrapper.getElementsByClassName('maNo');
                inputYes[0].onclick = function () { args.callback(true, args.extra_var); this.parentNode.remove(); };
                inputNo[0].onclick = function () { args.callback(false, args.extra_var); this.parentNode.remove(); };
            },
            
            /**
             * Custom prompt function
             * @returns {NULL}
             */
            prompt : function () {
                var args, html, wrapper, inputYes, inputNo, inputStr;
                
                args = modernAlert.extract_vars(arguments);
                html = '<h4>'+args.title+'</h4><p>'+args.msg+'</p>\n\
                <p class="maInputWrapper"><input class="maInput" type="text" value="" /></p>\n\
                <input class="button btn btn-default maYes" type="button" value="'+ args.buttons.ok +'" />\n\
                <input class="button btn btn-default maNo" type="button" value="'+ args.buttons.cancel +'" />';
                
                wrapper = modernAlert.createInsertHtml('div', 'modernAlertWrapper', html);
                
                inputYes = wrapper.getElementsByClassName('maYes');
                inputNo = wrapper.getElementsByClassName('maNo');
                inputStr = wrapper.getElementsByClassName('maInput');
                inputYes[0].onclick = function () { args.callback(inputStr[0].value, args.extra_var); this.parentNode.remove(); };
                inputNo[0].onclick = function () { args.callback(false, args.extra_var); this.parentNode.remove(); };
            },
            
            /**
             * Create an element and append to body
             * @param {string} elementType tagname
             * @param {string} cssClass class name for element
             * @param {string} html inner html
             * @returns {object} created element
             */
            createInsertHtml : function (elementType, cssClass, html) {
                var wrapper = document.createElement(elementType);
                wrapper.className = cssClass;
                wrapper.innerHTML = html;
                document.body.appendChild(wrapper);
                wrapper.style.cssText = "margin-left: -"+(wrapper.offsetWidth / 2)+"px; margin-top: -"+(wrapper.offsetHeight / 2)+"px;";
                return wrapper;
            }
        };
        
        /**
         * Init and return the modelAlert object
         */
        return modernAlert.init(arguments[0]);
    };
})();