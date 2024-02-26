import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import { set, useForm } from 'react-hook-form';

const Signup = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [error, setError] = useState('');
	const { register, handleSubmit } = useForm();

	const create = async data => {
		setError('');
		try {
			const userData = await authService.createAccount(data);
			if (userData) {
				const currentUser = await authService.getCurrentUser();
				if (currentUser) dispatch(login(currentUser));
				navigate('/');
			}
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className="flex items-center justify-center w-full">
			<div
				className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
			>
				<div className="mb-2 flex justify-center">
					<span className="inline-block w-full max-w-[100px]">
						<Logo width="100%" />
					</span>
				</div>
				<h2 className="text-center text-2xl font-bold leading-tight">
					SignUp to Create your Account
				</h2>
				<p className="mt-2 text-center text-base text-black/60">
					Already have an Account ?&nbsp;
					<Link
						to="/signup"
						className="font-medium text-primary transition-all duration-200 hover:underline"
					>
						Sign Up
					</Link>
				</p>
				{error && <p className="text-red-600 mt-8 text-center">{error}</p>}
				<form onSubmit={handleSubmit(create)} className="mt-8">
					<div className="space-y-5">
						<Input
							label="Name: "
							placeholder="Enter your Full Name"
							type="email"
							{...register('name', {
								required: true,
							})}
						/>
						<Input
							label="Email: "
							placeholder="Enter your Email address"
							type="email"
							{...register('email', {
								required: true,
								validate: {
									matchPatern: value =>
										/^\w+([.-]?\w+)*@w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
										'Email Address must be a valid address',
								},
							})}
						/>
						<Input
							label="Password: "
							type="password"
							placeholder="Enter your Password"
							{...register('password', {
								required: true,
							})}
						/>
						<Button type="submit" className="w-full">
							Create Account
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signup;
