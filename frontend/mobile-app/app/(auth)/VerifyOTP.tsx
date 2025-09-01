import React, { useMemo, useRef, useState } from "react";
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
import { useRouter } from "expo-router";

const topBg = require("../../assets/images/top_bg.png");
const bottomBg = require("../../assets/images/bottom_bg.png");

const { width: SCREEN_WIDTH } = Dimensions.get("window");

/** Figma frame used for the top artwork */
const TOP_FIGMA = { w: 439.7, h: 575.5 };
const TOP_TUNE = { scale: 1.05, dx: 14, dy: 50 }; // fine-tune if needed

// OTP + style specs from the mock
const OTP_LEN = 4;
const BOX_SIZE_W = 50;             // ≈ size in the screenshot
const BOX_SIZE_H = 60;             // ≈ size in the screenshot
const RADIUS = 14;
const BORDER = "#3C8FEF";

export default function VerifyOTP() {
    const router = useRouter();

    // optionally pass this via params; hardcoded to match your mock
    const phone = "0710632050";

    const [code, setCode] = useState<string[]>(Array(OTP_LEN).fill(""));
    const inputs = useRef<Array<TextInput | null>>([]);

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

    const CONTENT_TOP_INSET = sizes.topHeight * 0.37;

    const handleChange = (val: string, i: number) => {
        const char = val.replace(/\D/g, "").slice(-1); // keep last digit only
        const next = [...code];
        next[i] = char ?? "";
        setCode(next);
        if (char && i < OTP_LEN - 1) inputs.current[i + 1]?.focus();
    };

    const handleKeyPress = (e: any, i: number) => {
        if (e.nativeEvent.key === "Backspace" && !code[i] && i > 0) {
            inputs.current[i - 1]?.focus();
        }
    };

    const submit = () => {
        const otp = code.join("");
        // TODO: verify OTP
        router.push("/(auth)/ResetPassword"); // example
    };

    const resend = () => {
        // TODO: trigger resend
    };

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
                        <Text className="text-[20px] text-black font-semibold font-manuale-semibold">Enter Verification Code</Text>
                        <Text className="mt-2 text-[16px] text-black">
                            We have sent a code to{" "}
                            <Text className="font-extrabold">{phone}</Text>
                        </Text>
                    </View>

                    {/* OTP Inputs */}
                    <View className="flex-row justify-center mt-10 space-x-5" style={{ marginTop: 80 }}>
                        {Array.from({ length: OTP_LEN }).map((_, i) => (
                            <TextInput
                                key={i}
                                // @ts-ignore
                                ref={(el) => (inputs.current[i] = el)}
                                keyboardType="number-pad"
                                returnKeyType="done"
                                maxLength={1}
                                value={code[i]}
                                onChangeText={(v) => handleChange(v, i)}
                                onKeyPress={(e) => handleKeyPress(e, i)}
                                className="bg-white text-[20px] font-semibold  text-black"
                                style={{
                                    width: BOX_SIZE_W,
                                    height: BOX_SIZE_H,
                                    textAlign: "center",
                                    borderWidth: 1,
                                    borderColor: BORDER,
                                    borderRadius: RADIUS,
                                    marginHorizontal:8,
                                }}
                            />
                        ))}
                    </View>

                    {/* Space so button clears bottom wave */}
                    <View style={{ height: sizes.bottomHeight * 1.5 }} />

                    {/* Verify button */}
                    <TouchableOpacity className="self-center active:opacity-80" onPress={submit}>
                        <View className="w-[191px] h-[45px] rounded-full bg-[#3072BF] items-center justify-center">
                            <Text className="text-white text-[16px] font-semibold">Verify Now</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Resend line */}
                    <View className="items-center mt-6">
                        <Text className="text-[14px] text-black font-poppins-regular ">
                            Didn’t you receive any code?{" "}
                            <Text className="font-extrabold" onPress={resend}>
                                Resend Code
                            </Text>
                        </Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
