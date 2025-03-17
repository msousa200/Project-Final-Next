"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store';
import RequireAuth from '@/components/auth/RequireAuth';
import { FaUser, FaEnvelope, FaCalendar, FaEdit } from 'react-icons/fa';
import { updateUserData } from '@/features/cartSlice';
import { toast } from 'react-hot-toast';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.cart.userData);

  const [editForm, setEditForm] = useState<Omit<UserProfile, 'id'>>({
    name: userData?.name || '',
    email: userData?.email || '',
    dateOfBirth: userData?.dateOfBirth || '',
  });

  useEffect(() => {
    if (!userData) {
      router.push('/login');
      return;
    }

    setEditForm({
      name: userData.name,
      email: userData.email,
      dateOfBirth: userData.dateOfBirth,
    });
  }, [userData, router]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-PT');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!userData?.id) {
        throw new Error('ID do usuário não encontrado');
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex((u: UserProfile) => u.id === userData.id);

      if (userIndex === -1) {
        throw new Error('Usuário não encontrado');
      }

      const updatedUser = {
        ...users[userIndex],
        ...editForm,
      };
      users[userIndex] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));

      dispatch(updateUserData({
        id: userData.id,
        ...editForm,
      }));

      setIsEditing(false);
      toast.success('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      toast.error('Erro ao atualizar perfil');
    } finally {
      setIsLoading(false);
    }
  };

  if (!userData) {
    return null;
  }

  return (
    <RequireAuth>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full space-y-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Cabeçalho do Perfil */}
            <div className="bg-gradient-to-r from-black to-gray-800 text-white p-6 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">Perfil do Usuário</h1>
              {!isEditing && (
                <button
                  onClick={handleEdit}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <FaEdit className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Formulário de Edição ou Visualização */}
            {isEditing ? (
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-2 focus:ring-black transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-2 focus:ring-black transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={editForm.dateOfBirth}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-2 focus:ring-black transition-all"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900 disabled:opacity-50 transition-all"
                  >
                    {isLoading ? 'Salvando...' : 'Salvar'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-all"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="bg-black p-3 rounded-full">
                      <FaUser className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Nome</p>
                      <p className="font-medium text-gray-900">{userData?.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="bg-black p-3 rounded-full">
                      <FaEnvelope className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{userData?.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="bg-black p-3 rounded-full">
                      <FaCalendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Data de Nascimento</p>
                      <p className="font-medium text-gray-900">{userData?.dateOfBirth}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}