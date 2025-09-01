import { Tabs } from 'expo-router';
import React from 'react';
import BottomBar from "@/components/BottomBar";

const TabLayout = () => {
  return (
      <Tabs
          screenOptions={{ headerShown: false, tabBarShowLabel: false }}
          tabBar={(props) => <BottomBar {...props} />}
      >
          <Tabs.Screen name="index"    options={{ title: "Home" }} />
          <Tabs.Screen name="userType" options={{ title: "User Type" }} />
          <Tabs.Screen name="donate"   options={{ title: "Donate" }} />
          <Tabs.Screen name="profile"  options={{ title: "Profile" }} />
      </Tabs>
  );
};

export default TabLayout;
