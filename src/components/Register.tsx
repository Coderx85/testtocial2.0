"use client"
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FormData } from '@/types';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import useAuth from '@/context/useAuth';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { initialFormData } from '@/constants';

const Register = () => {
  const { setAuthStatus } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.message);
        return;
      }    
      
      // Here you can add your form submission logic
      console.log(res);
      setAuthStatus(true);
      toast.success('Registration successful!');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.message);
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div 
        className="bg-white p-8 min-w-fit w-3/5 rounded-lg shadow-md"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex justify-between">
            <div>
              <Label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Username</Label>
              <Input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <Label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <Label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="bio" className="block text-gray-700 font-semibold mb-2">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-6">
            <Label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-2">Confirm Password</Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
          >
            Register
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;