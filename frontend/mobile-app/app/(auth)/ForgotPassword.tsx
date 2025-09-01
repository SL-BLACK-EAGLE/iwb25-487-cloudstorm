import React, { useMemo, useState } from "react";
import {
    Dimensions,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    View,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ImageSourcePropType,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const topBg = require("../../assets/images/top_bg.png");
const bottomBg = require("../../assets/images/bottom_bg.png");
// Use the exact filename you shared
const rocket: ImageSourcePropType = require("../../assets/images/forget_password.png");

const { width: SCREEN_WIDTH } = Dimensions.get("window");

/** Figma frame used for the top artwork */
const TOP_FIGMA = { w: 439.7, h: 575.5 };
const TOP_TUNE = { scale: 1.05, dx: 14, dy: 50 }; // fine-tune if your export differs

// Input specs from the mock
const INPUT_W = 320;
const INPUT_H = 45;
const INPUT_RADIUS = 14;
const INPUT_BORDER = "#3CBFEF";

export default function ForgotPassword() {
    const [mobile, setMobile] = useState("");
    const router = useRouter();

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

    const CONTENT_TOP_INSET = sizes.topHeight * 0.30;

    return (
        <SafeAreaView className="flex-1 bg-[#EBF8FF]">
            <StatusBar barStyle="dark-content" />

            {/* Top decorative wave */}
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

            {/* Bottom decorative wave */}
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
            />

            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.select({ ios: "padding", android: undefined })}
            >
                <View className="flex-1 px-6" style={{ paddingTop: CONTENT_TOP_INSET }}>
                    {/* Header */}
                    <View className="items-center">
                        <Text className="text-[20px] text-black font-semibold font-manuale-semibold">Forget Password</Text>
                        <Text className="mt-2 text-[16px] text-black font-semibold text-center">
                            Enter your Phone Number to reset password
                        </Text>
                    </View>

                    {/* Illustration */}
                    <View className="items-center mt-6">
                        <Image source={rocket} resizeMode="contain" style={{ width: 255, height: 255 }} />
                    </View>

                    {/* Single Mobile Input (320×45, 14 radius, #3CBFEF) */}
                    <View className="mt-4 self-center" style={{ width: INPUT_W }}>
                        <View
                            className="relative bg-white"
                            style={{
                                width: INPUT_W,
                                height: INPUT_H,
                                borderRadius: INPUT_RADIUS,
                                borderWidth: 1,
                                borderColor: INPUT_BORDER,
                            }}
                        >
                            {/* Left icon chip */}
                            <View
                                className="absolute left-3 top-1/2 -translate-y-1/2 items-center justify-center"
                                style={{
                                    width: 29,
                                    height: 29,
                                    borderColor: INPUT_BORDER,
                                    backgroundColor: "white",
                                }}
                            >
                                <Ionicons name="phone-portrait-outline" className={'text-black'} size={29} />
                            </View>

                            <TextInput
                                placeholder="Enter Your Mobile"
                                placeholderTextColor="#6D6E6E"
                                keyboardType="phone-pad"
                                value={mobile}
                                onChangeText={setMobile}
                                className="h-full pr-4 mt-1 text-[14px] font-poppins-regular text-black"
                                // padding-left leaves room for the icon chip
                                style={{ paddingLeft: 48 }}
                            />
                        </View>
                    </View>

                    {/* Space so the buttons clear the bottom wave */}
                    <View style={{ height: sizes.bottomHeight * 0.20 }} />

                    {/* Buttons */}
                    <View className="items-center mt-8">
                        <TouchableOpacity
                            className="active:opacity-80"
                            onPress={() => {
                                // TODO: navigate to OTP screen
                                router.push("/(auth)/VerifyOTP");
                            }}
                        >
                            <View className="w-[191px] h-[45px] rounded-full bg-[#3072BF] items-center justify-center">
                                <Text className="text-white text-[16px] font-semibold">Continue</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="mt-4 active:opacity-80"
                            onPress={() => router.back()}
                        >
                            <View className="w-[191px] h-[45px] rounded-full bg-[#0ca6c8] items-center justify-center">
                                <Text className="text-white text-[16px] font-semibold">Cancel</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
