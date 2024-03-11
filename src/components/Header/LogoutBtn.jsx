import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

const LogoutBtn = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const authStatus = useSelector(state => state.auth.status);

	const LogoutHandler = () => {
		authService.logout().then(() => {
			dispatch(logout());
		});
	};
	useEffect(() => {
		console.log(authStatus);
		if (!authStatus) {
			navigate('/');
		}
	}, [LogoutHandler, authStatus]);

	return (
		<button
			onClick={LogoutHandler}
			className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
		>
			{' '}
			Logout
		</button>
	);
};

export default LogoutBtn;
