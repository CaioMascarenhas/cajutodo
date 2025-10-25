"use client"

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';

type AlertContextType = {
	showAlert: (message: string, severity?: AlertColor, duration?: number) => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

type AlertProviderProps = {
	children: ReactNode;
};

export const AlertProvider = ({ children }: AlertProviderProps) => {
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState('');
	const [severity, setSeverity] = useState<AlertColor>('info');
	const [duration, setDuration] = useState<number | undefined>(4000);

	const showAlert = useCallback((msg: string, sev: AlertColor = 'info', dur: number = 4000) => {
		setMessage(msg);
		setSeverity(sev);
		setDuration(dur);
		setOpen(true);
	}, []);

	const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') return;
		setOpen(false);
	};

	return (
		<AlertContext.Provider value={{ showAlert }}>
			{children}
			<Snackbar open={open} autoHideDuration={duration} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
				<MuiAlert onClose={handleClose} severity={severity} sx={{ width: '100%' }} elevation={6} variant="filled">
					{message}
				</MuiAlert>
			</Snackbar>
		</AlertContext.Provider>
	);
};

export const useAlert = () => {
	const context = useContext(AlertContext);
	if (!context) {
		throw new Error('useAlert must be used within an AlertProvider');
	}
	return context;
};
