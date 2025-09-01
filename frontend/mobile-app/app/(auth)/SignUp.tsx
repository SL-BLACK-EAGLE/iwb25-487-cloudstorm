import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    Dimensions,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const topBg = require("../../assets/images/top_bg.png");
const bottomBg = require("../../assets/images/bottom_bg.png");

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Figma frame used for the top artwork
const TOP_FIGMA = { w: 439.7, h: 575.5 };
// Fine-tune the top image position if your export is slightly different
const TOP_TUNE = { scale: 1.05, dx: 14, dy: 50 };

// Input specs from Figma
const INPUT_W = 320;
const INPUT_H = 45;
const INPUT_RADIUS = 14;
const INPUT_BORDER = "#3CBFEF";

export default function SignUp() {
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [mobile, setMobile] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [showRoleDropdown, setShowRoleDropdown] = useState(false);

    const roleOptions = [
        "Admin",
        "Manager", 
        "Employee",
        "Volunteer",
        "Coordinator"
    ];

    const sizes = useMemo(() => {
        const base = SCREEN_WIDTH / TOP_FIGMA.w;
        const s = base * TOP_TUNE.scale;

        const topWidth = SCREEN_WIDTH * TOP_TUNE.scale;
        const topHeight = TOP_FIGMA.h * s;

        const bSrc = Image.resolveAssetSource(bottomBg);
        const bottomHeight = SCREEN_WIDTH / (bSrc.width / bSrc.height);

        return {
            topWidth,
            topHeight,
            topDx: TOP_TUNE.dx * base,
            topDy: TOP_TUNE.dy * base,
            bottomHeight,
        };
    }, []);

    // Position content nicely inside the white shape
    const CONTENT_TOP_INSET = sizes.topHeight * 0.36;

    return (
        <SafeAreaView className="flex-1 bg-[#EBF8FF}">
            <StatusBar barStyle="dark-content" />

            {/* Top decorative wave (right-anchored) */}
            <Image
                source={topBg}
                resizeMode="cover"
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: sizes.topWidth,
                    height: sizes.topHeight,
                    transform: [{ translateX: sizes.topDx }, { translateY: sizes.topDy }],
                }}
            />

            {/* Bottom decorative wave with footer login link */}
            <ImageBackground
                source={bottomBg}
                resizeMode="contain"
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: SCREEN_WIDTH,
                    height: sizes.bottomHeight,
                }}
            >
                <View className="flex-1 items-center justify-end pb-5 mb-3">
                    <View className="flex-row items-center">
                        <Text className="text-[14px] text-white">Already have an account? </Text>
                        <TouchableOpacity onPress={() => router.push('/(auth)/SignIn')}>
                            <Text className="text-[14px] font-semibold text-white">Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>

            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.select({ ios: "padding", android: undefined })}
            >
                <View className="flex-1 px-6" style={{ paddingTop: CONTENT_TOP_INSET }}>
                    {/* Title */}
                    <View className="items-center">
                        <Text className="text-2xl text-black font-semibold font-manuale-semibold">
                            Create New Account
                        </Text>
                    </View>

                    {/* Form */}
                    <View className="mt-8 space-y-5">
                        {/* First Name */}
                        <View className="self-center mt-8" style={{ width: INPUT_W }}>
                            <Text className="mb-2 text-[16px] font-manuale-semibold text-black font-semibold">First Name</Text>
                            <View
                                className="bg-white"
                                style={{
                                    width: INPUT_W,
                                    height: INPUT_H,
                                    borderRadius: INPUT_RADIUS,
                                    borderWidth: 1,
                                    borderColor: INPUT_BORDER,
                                }}
                            >
                                <TextInput
                                    placeholder="Enter Your First Name"
                                    placeholderTextColor="#6D6E6E"
                                    value={first}
                                    onChangeText={setFirst}
                                    className="px-4 h-full text-[14px] font-poppins-regular text-black"
                                />
                            </View>
                        </View>

                        {/* Last Name */}
                        <View className="self-center mt-3" style={{ width: INPUT_W }}>
                            <Text className="mb-2 text-[16px] font-manuale-semibold text-black font-semibold">Last Name</Text>
                            <View
                                className="bg-white"
                                style={{
                                    width: INPUT_W,
                                    height: INPUT_H,
                                    borderRadius: INPUT_RADIUS,
                                    borderWidth: 1,
                                    borderColor: INPUT_BORDER,
                                }}
                            >
                                <TextInput
                                    placeholder="Enter Your Last Name"
                                    placeholderTextColor="#6D6E6E"
                                    value={last}
                                    onChangeText={setLast}
                                    className="px-4 h-full font-poppins-regular text-[14px] text-black"
                                />
                            </View>
                        </View>

                        {/* Mobile */}
                        <View className="self-center  mt-3" style={{ width: INPUT_W }}>
                            <Text className="mb-2 text-[16px] font-manuale-semibold text-black font-semibold">Mobile</Text>
                            <View
                                className="bg-white"
                                style={{
                                    width: INPUT_W,
                                    height: INPUT_H,
                                    borderRadius: INPUT_RADIUS,
                                    borderWidth: 1,
                                    borderColor: INPUT_BORDER,
                                }}
                            >
                                <TextInput
                                    placeholder="Enter Your Mobile"
                                    placeholderTextColor="#6D6E6E"
                                    keyboardType="phone-pad"
                                    value={mobile}
                                    onChangeText={setMobile}
                                    className="px-4 h-full font-poppins-regular text-[14px] text-black"
                                />
                            </View>
                        </View>

                        {/* User Role */}
                        <View className="self-center mt-3" style={{ width: INPUT_W, zIndex: 10 }}>
                            <Text className="mb-2 text-[16px] font-manuale-semibold text-black font-semibold">User Role</Text>
                            <TouchableOpacity
                                onPress={() => setShowRoleDropdown(!showRoleDropdown)}
                                style={{
                                    width: INPUT_W,
                                    height: INPUT_H,
                                    borderRadius: INPUT_RADIUS,
                                    borderWidth: 1,
                                    borderColor: INPUT_BORDER,
                                }}
                                className="flex-row items-center bg-white px-4"
                            >
                                <Text className={`flex-1 text-[14px] font-poppins-regular ${role ? 'text-black' : 'text-[#6D6E6E]'}`}>
                                    {role || "Select Your Role"}
                                </Text>
                                <Ionicons
                                    name={showRoleDropdown ? "chevron-up" : "chevron-down"}
                                    size={20}
                                    color="#1A1A1A"
                                />
                            </TouchableOpacity>
                            
                            {showRoleDropdown && (
                                <View
                                    className="bg-white border border-[#3CBFEF] shadow-lg"
                                    style={{
                                        position: 'absolute',
                                        top: 65,
                                        left: 0,
                                        width: INPUT_W,
                                        borderRadius: INPUT_RADIUS,
                                        maxHeight: 200,
                                        zIndex: 1000,
                                        elevation: 10,
                                    }}
                                >
                                    {roleOptions.map((option, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => {
                                                setRole(option);
                                                setShowRoleDropdown(false);
                                            }}
                                            className="px-4 py-3"
                                            style={{
                                                borderBottomWidth: index === roleOptions.length - 1 ? 0 : 1,
                                                borderBottomColor: '#f3f4f6'
                                            }}
                                        >
                                            <Text className="text-[14px] text-black">{option}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>

                        {/* Password with eye toggle */}
                        <View className="self-center mt-3" style={{ width: INPUT_W }}>
                            <Text className="mb-2 text-[16px] font-manuale-semibold text-black font-semibold">Password</Text>
                            <View
                                className="flex-row items-center bg-white"
                                style={{
                                    width: INPUT_W,
                                    height: INPUT_H,
                                    borderRadius: INPUT_RADIUS,
                                    borderWidth: 1,
                                    borderColor: INPUT_BORDER,
                                }}
                            >
                                <TextInput
                                    placeholder="Enter Your Password"
                                    placeholderTextColor="#6D6E6E"
                                    secureTextEntry={!show}
                                    value={password}
                                    onChangeText={setPassword}
                                    className="flex-1 px-4 text-[14px] font-poppins-regular text-black"
                                />
                                <TouchableOpacity
                                    onPress={() => setShow((s) => !s)}
                                    accessibilityLabel={show ? "Hide password" : "Show password"}
                                    className="px-4"
                                >
                                    <Ionicons
                                        name={show ? "eye" : "eye-off"}
                                        size={22}
                                        color="#1A1A1A"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Space so the button clears the bottom wave (mirrors mock) */}
                    <View style={{ height: sizes.bottomHeight * 0.10 }} />

                    {/* Register button */}
                    <TouchableOpacity className="self-center active:opacity-80">
                        <View className="w-[191px] h-[45px] rounded-full bg-[#3072BF] items-center justify-center">
                            <Text className="text-white text-[16px] font-semibold">Register Now</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
