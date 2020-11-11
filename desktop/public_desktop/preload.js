const { ipcRenderer, contextBridge } = require( 'electron' );

// Outgoing IPC message channels.
// Maintain this list in alphabetical order.
const sendChannels = [
	'cannot-use-editor',
	'get-config',
	'get-settings',
	'log',
	'request-site-response',
	'user-auth',
	'unread-notices-count',
	'user-login-status',
];

// Incoming IPC message channels.
// Maintain this list in alphabetical order.
const receiveChannels = [
	'cookie-auth-complete',
	'enable-notification-badge',
	'toggle-notification-bar',
	'enable-site-option',
	'navigate',
	'new-post',
	'page-help',
	'page-my-sites',
	'page-profile',
	'page-reader',
	'notification-clicked',
	'notifications-panel-refresh',
	'notifications-panel-show',
	'request-site',
	'request-user-login-status',
	'signout',
];

contextBridge.exposeInMainWorld( 'electron', {
	send: ( channel, data ) => {
		if ( sendChannels.includes( channel ) ) {
			ipcRenderer.send( channel, data );
		}
	},
	receive: ( channel, callback ) => {
		if ( receiveChannels.includes( channel ) ) {
			// exclude event with sender info
			ipcRenderer.on( channel, ( _, ...args ) => callback( ...args ) );
		}
	},
	logger: ( namespace, options ) => {
		const send = ( level, message, meta ) => {
			ipcRenderer.send( 'log', level, namespace, options, message, meta );
		};

		return {
			error: ( message, meta ) => send( 'error', message, meta ),
			warn: ( message, meta ) => send( 'warn', message, meta ),
			info: ( message, meta ) => send( 'info', message, meta ),
			debug: ( message, meta ) => send( 'debug', message, meta ),
			silly: ( message, meta ) => send( 'silly', message, meta ),
		};
	},
	getConfig: async () => {
		const config = await ipcRenderer.invoke( 'get-config' );
		console.log( 'Returning config object: ', config ); // eslint-disable-line
		return config;
	},
	getSettings: async () => {
		const settings = await ipcRenderer.invoke( 'get-settings' );
		console.log( 'Returning settings object: ', settings ); // eslint-disable-line
		return settings;
	},
} );
