import React from 'react';
import {View, Text, Pressable, Image} from 'react-native';
import {BottomTabBarProps} from "@react-navigation/bottom-tabs";
import {useSafeAreaInsets} from "react-native-safe-area-context";


const ICONS = {
    index:   require("../assets/icons/Home.png"),
    userType:     require("../assets/icons/User_Groups.png"),
    donate:  require("../assets/icons/Hand_Holding_Heart.png"),
    profile: require("../assets/icons/Admin_Settings_Male.png"),
} as const;

const BottomBar = ({ state, navigation }: BottomTabBarProps) => {
    const insets = useSafeAreaInsets();


    return (
        <View>
            <View style={{ height: 16 }} />
            <View className="items-center px-4" style={{ paddingBottom: Math.max(insets.bottom, 10) }}>
                {/* Rounded pill bar */}
                <View className="w-11/12 h-[45px] rounded-full bg-[#06304A] flex-row items-center justify-around px-6">
                    {state.routes.map((route, index) => {
                        const focused = state.index === index;
                        const onPress = () => {
                            const e = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
                            if (!focused && !e.defaultPrevented) navigation.navigate(route.name);
                        };

                        const src =
                            ICONS[route.name as keyof typeof ICONS] ??
                            ICONS.index;

                        return (
                            <Pressable
                                key={route.key}
                                onPress={onPress}
                                className="flex-1 items-center justify-center"
                                style={{ opacity: focused ? 1 : 0.65 }}
                            >
                                <Image
                                    source={src}
                                    resizeMode="contain"
                                    // Exact Figma size: W 43, H 36.51
                                    style={{
                                        width: 43,
                                        height: 36.51,
                                        // If your PNGs are monochrome, tint handles active/inactive colors
                                        tintColor: focused ? "#FFFFFF" : "#CFE6F0",
                                    }}
                                />
                            </Pressable>
                        );
                    })}
                </View>
            </View>
        </View>
    );
}

export default BottomBar;
