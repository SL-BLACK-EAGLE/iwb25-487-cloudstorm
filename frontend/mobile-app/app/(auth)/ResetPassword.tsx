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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const topBg = require("../../assets/images/top_bg.png");
const bottomBg = require("../../assets/images/bottom_bg.png");

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Artwork frame + fine-tune to match your waves
const TOP_FIGMA = { w: 439.7, h: 575.5 };
const TOP_TUNE = { scale: 1.05, dx: 14, dy: 50 };

// Input specs from Figma
const INPUT_W = 320;
const INPUT_H = 45;
const INPUT_RADIUS = 14;
const INPUT_BORDER = "#3CBFEF";

export default function ResetPassword() {
    const [newPwd, setNewPwd] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

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

    const CONTENT_TOP_INSET = sizes.topHeight * 0.40;

    const onConfirm = () => {
        // TODO: call your API to set the new password
        // if (newPwd === confirmPwd) ...
    };

    const onResend = () => {
        // TODO: resend OTP / link
    };

    return (
        <SafeAreaView className="flex-1 bg-[#EBF8FF]">
            <StatusBar barStyle="dark-content" />

            {/* Top & Bottom Waves */}
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
                        <Text className="text-2xl text-black font-semibold font-manuale-semibold">Reset Your Password</Text>
                        <Text className="mt-2 text-base text-black text-center font-poppins-semibold">
                            The password must be different than before
                        </Text>
                    </View>

                    {/* Form */}
                    <View className="mt-10 space-y-5">
                        {/* Create New Password */}
                        <View className="self-center mt-14" style={{ width: INPUT_W }}>
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
                                    placeholder="Create New Password"
                                    placeholderTextColor="#6D6E6E"
                                    secureTextEntry={!showNew}
                                    value={newPwd}
                                    onChangeText={setNewPwd}
                                    className="flex-1 px-4 text-[14px] text-black"
                                />
                                <TouchableOpacity
                                    className="px-4"
                                    onPress={() => setShowNew((s) => !s)}
                                    accessibilityLabel={showNew ? "Hide new password" : "Show new password"}
                                >
                                    <Ionicons
                                        name={showNew ? "eye" : "eye-off"}
                                        size={22}
                                        color="#1A1A1A"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Confirm Password */}
                        <View className="self-center mt-5" style={{ width: INPUT_W }}>
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
                                    placeholder="Confirm Password"
                                    placeholderTextColor="#6D6E6E"
                                    secureTextEntry={!showConfirm}
                                    value={confirmPwd}
                                    onChangeText={setConfirmPwd}
                                    className="flex-1 px-4 text-[14px] text-black"
                                />
                                <TouchableOpacity
                                    className="px-4"
                                    onPress={() => setShowConfirm((s) => !s)}
                                    accessibilityLabel={showConfirm ? "Hide confirm password" : "Show confirm password"}
                                >
                                    <Ionicons
                                        name={showConfirm ? "eye" : "eye-off"}
                                        size={22}
                                        color="#1A1A1A"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Space so the button clears the bottom wave */}
                    <View style={{ height: sizes.bottomHeight * 0.28 }} />

                    {/* Confirm button */}
                    <TouchableOpacity className="self-center mt-36 active:opacity-80" onPress={onConfirm}>
                        <View className="w-[191px] h-[45px] rounded-full bg-[#3072BF] items-center justify-center">
                            <Text className="text-white text-[16px] font-poppins-semibold">Confirm</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
