import React, { useMemo } from "react";
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Image,
    ImageBackground,
    Pressable,
    Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const A = {
    topBg: require("../../assets/images/header-wave.png"),
    back: require("../../assets/icons/Chevron_Left.png"),
    victim: require("../../assets/images/victim.png"),
    volunteer: require("../../assets/images/volunteer.png"),
};

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function UserType() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // exact header aspect so the wave shape is not distorted
    const headerAR = useMemo(() => {
        const src = Image.resolveAssetSource(A.topBg);
        return src.width / src.height; // w/h
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-[#E8F5FB] ">
            {/* ===== Header (image clipped with rounded bottom) ===== */}
            <ImageBackground
                source={A.topBg}
                resizeMode="cover"
                className={'mt-[45px]'}
                style={{
                    width: SCREEN_WIDTH,
                    aspectRatio: headerAR,
                    borderBottomLeftRadius: 28,
                    borderBottomRightRadius: 28,
                }}
            >
                {/* overlay for back + title, padded for status bar */}
                <View
                    style={{
                        paddingTop:  30,
                        paddingBottom: 14,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {/*/!* Back *!/*/}
                    {/*<Pressable*/}
                    {/*    onPress={() => router.back()}*/}
                    {/*    style={{*/}
                    {/*        position: "absolute",*/}
                    {/*        left: 16,*/}
                    {/*        top: 30,*/}
                    {/*        height: 40,*/}
                    {/*        width: 40,*/}
                    {/*        alignItems: "center",*/}
                    {/*        justifyContent: "center",*/}
                    {/*        zIndex: 2, // keep above everything*/}
                    {/*    }}*/}
                    {/*    hitSlop={10}*/}
                    {/*>*/}
                    {/*    <Image*/}
                    {/*        source={A.back}*/}
                    {/*        style={{ width: 22, height: 22, tintColor: "#FFFFFF" }}*/}
                    {/*    />*/}
                    {/*</Pressable>*/}

                    {/* Title */}
                    <Text
                        style={{ color: "white" }}
                        className="text-[18px] font-semibold"
                    >
                        User Services
                    </Text>
                </View>
            </ImageBackground>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 }}
            >
                {/* Subtitle */}
                <Text className="text-[16px] mt-20 text-center font-poppins-bold">
                    You are
                </Text>

                {/* Cards */}
                <View className="mt-6 items-center gap-14">
                    <CardTile image={A.victim} onPress={()=> router.push('/victim/VictimOperationsDashboard')}/>
                    <CardTile image={A.volunteer}  />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

/* ——— Components ——— */

function CardTile({
                      image,
                      onPress,
                  }: {
    image: any;
    onPress?: () => void;
}) {
    // Figma tile size (PNG already has gradient, icon & label)
    const TILE_W = 188;
    const TILE_H = 175;

    return (
        <Pressable onPress={onPress} className="active:opacity-90">
            <ImageBackground
                source={image}
                resizeMode="cover"
                style={{
                    width: TILE_W,
                    height: TILE_H,
                    borderRadius: 20,
                    overflow: "hidden",
                    // soft drop shadow like Figma
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.18,
                    shadowRadius: 10,
                    elevation: 10,
                }}
            />
        </Pressable>
    );
}
