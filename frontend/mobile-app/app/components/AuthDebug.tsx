import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../hooks/useAuth';

export const AuthDebug: React.FC = () => {
  const { user, isAuthenticated, isLoading, error } = useAuth();

  return (
    <View style={{ padding: 20, backgroundColor: '#f0f0f0', margin: 10 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Auth Debug Info:</Text>
      <Text>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</Text>
      <Text>Loading: {isLoading ? 'Yes' : 'No'}</Text>
      <Text>Error: {error || 'None'}</Text>
      <Text>User: {user ? user.email : 'None'}</Text>
    </View>
  );
};
