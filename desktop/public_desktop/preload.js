const { ipcRenderer, contextBridge } = require( 'electron' );

const sendChannels = [ 'get-config', 'get-settings', 'log', 'user-auth' ];
const receiveChannels = [ 'cookie-auth-complete' ];

contextBridge.exposeInMainWorld( 'electron', {
	send: ( channel, data ) => {
		if ( sendChannels.includes( channel ) ) {
			ipcRenderer.send( channel, data );
		}
	},
	on: ( channel, callback ) => {
		if ( receiveChannels.includes( channel ) ) {
			// Remove `sender` from event
			ipcRenderer.on( channel, ( event, ...args ) => callback( ...args ) );
		}
	},
	logger: ( namespace, options ) => {
		const send = ( level, message, meta ) => {
			ipcRenderer.send( 'log', level, namespace, options, message, meta );
		};

		return {
			error: ( message, meta ) => send( 'error', namespace, options, message, meta ),
			warn: ( message, meta ) => send( 'warn', namespace, options, message, meta ),
			info: ( message, meta ) => send( 'info', namespace, options, message, meta ),
			debug: ( message, meta ) => send( 'debug', namespace, options, message, meta ),
			silly: ( message, meta ) => send( 'silly', namespace, options, message, meta ),
		};
	},
	getConfig: async () => {
		const config = await ipcRenderer.invoke( 'get-config' );
		return config;
	},
	getSettings: async () => {
		const settings = await ipcRenderer.invoke( 'get-settings' );
		return settings;
	},
} );
