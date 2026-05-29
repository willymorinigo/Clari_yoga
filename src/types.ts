/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string;
  name: string;
  description: string;
  category: 'yoga' | 'shiatsu' | 'combo';
  duration: number; // in minutes
  price: number;
  intensity?: 'Suave' | 'Moderada' | 'Intensa' | 'Restaurativa';
  benefits: string[];
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  serviceCategory: 'yoga' | 'shiatsu' | 'combo';
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  userName: string;
  userEmail: string;
  userPhone: string;
  comments?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface Review {
  id: string;
  userName: string;
  text: string;
  rating: number;
  serviceName: string;
}

export interface TeacherInfo {
  id: string;
  name: string;
  role: string;
  bio: string;
  specialty: string;
  image: string;
}
