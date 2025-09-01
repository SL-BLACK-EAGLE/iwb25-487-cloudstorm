// app/(tabs)/donate.tsx (or wherever your route lives)
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
    StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const A = {
    topBg: require("../../assets/images/header-wave.png"),
    back: require("../../assets/icons/Chevron_Left.png"),

    // Category tiles (these PNGs already include icon + label)
    flooding: require("../../assets/images/flooding.png"),
    tsunami: require("../../assets/images/tsunami.png"),
    drought: require("../../assets/images/drought.png"),
    hurricane: require("../../assets/images/hurricane.png"),

    // List backgrounds (cycle 1-2-3)
    bg1: require("../../assets/images/disaster_bg1.png"),
    bg2: require("../../assets/images/disaster_bg2.png"),
    bg3: require("../../assets/images/disaster_bg3.png"),
};

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Donate() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // keep header wave exact
    const headerAR = useMemo(() => {
        const src = Image.resolveAssetSource(A.topBg);
        return src.width / src.height; // w/h
    }, []);

    // ---- DATA ----
    const categories = [
        { key: "flooding", image: A.flooding, onPress: () => {} },
        { key: "tsunami", image: A.tsunami, onPress: () => {} },
        { key: "drought", image: A.drought, onPress: () => {} },
        { key: "hurricane", image: A.hurricane, onPress: () => {} },
    ];

    const updatedDisasters = [
        {
            id: "1",
            title: "Flooding in Ja–ela (Maryland)",
            desc:
                "Ja Ela, Sri Lanka Flood Map may be useful to some extent for flood risk assessment or in flood management, flood control etc.",
        },
        {
            id: "2",
            title: "Flooding in Kandana (Town)",
            desc:
                "Ja Ela, Sri Lanka Flood Map may be useful to some extent for flood risk assessment or in flood management, flood control etc.",
        },
        {
            id: "3",
            title: "Flooding in Kandana (Town)",
            desc:
                "Ja Ela, Sri Lanka Flood Map may be useful to some extent for flood risk assessment or in flood management, flood control etc.",
        },
        // Add more; backgrounds will continue 1,2,3,1,2,3…
    ];

    const newsBGs = [A.bg1, A.bg2, A.bg3];

    return (
        <SafeAreaView className="flex-1 bg-[#E8F5FB]">
            {/* ===== Header (wave with rounded bottom) ===== */}
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
                <View
                    style={{
                        paddingTop:  30,
                        paddingBottom: 14,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {/*<Pressable*/}
                    {/*    onPress={() => router.back()}*/}
                    {/*    style={{*/}
                    {/*        position: "absolute",*/}
                    {/*        left: 16,*/}
                    {/*        top: insets.top + 6,*/}
                    {/*        height: 40,*/}
                    {/*        width: 40,*/}
                    {/*        zIndex: 2,*/}
                    {/*    }}*/}
                    {/*    className="items-center justify-center"*/}
                    {/*    hitSlop={10}*/}
                    {/*>*/}
                    {/*    <Image*/}
                    {/*        source={A.back}*/}
                    {/*        style={{ width: 22, height: 22, tintColor: "#FFFFFF" }}*/}
                    {/*    />*/}
                    {/*</Pressable>*/}

                    <Text className="text-white text-[18px] font-semibold">
                        Variety of disasters
                    </Text>
                </View>
            </ImageBackground>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 36 }}
            >
                {/* Variety of disasters */}
                <Text className="mt-6 px-6 text-[14px] font-poppins-semibold text-black">
                    Variety of disasters
                </Text>

                {/* 4 tiles in a horizontal row like Figma */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 24, columnGap: 26 }}
                    className="my-3"
                >
                    {categories.map((c) => (
                        <CategoryTile key={c.key} image={c.image} onPress={c.onPress} />
                    ))}
                </ScrollView>

                {/* New Updated disasters */}
                <Text className="mt-6 px-6 text-[14px] font-poppins-semibold text-black">
                    New Updated disasters
                </Text>

                <View className="mt-4 px-6 gap-4">
                    {updatedDisasters.map((item, i) => (
                        <NewsCard
                            key={item.id}
                            bg={newsBGs[i % newsBGs.length]} // 1-2-3 cycling
                            title={item.title}
                            desc={item.desc}
                            onPress={() => {}}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}



function CategoryTile({
                          image,
                          onPress,
                      }: {
    image: any;
    onPress?: () => void;
}) {

    const W = 145;
    const H = 156;

    return (
        <Pressable onPress={onPress} className="active:opacity-90">
            <ImageBackground
                source={image}
                resizeMode="cover"
                style={{
                    width: W,
                    height: H,
                    borderRadius: 18,
                    overflow: "hidden",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.18,
                    shadowRadius: 10,
                    elevation: 8,
                }}
            />
        </Pressable>
    );
}

function NewsCard({
                      bg,
                      title,
                      desc,
                      onPress,
                  }: {
    bg: any;
    title: string;
    desc: string;
    onPress?: () => void;
}) {
    const W = SCREEN_WIDTH - 48; // 24px side padding per Figma
    // keep the card’s AR from the PNG so it matches perfectly
    const src = Image.resolveAssetSource(bg);
    const H = W * (src.height / src.width);

    return (
        <Pressable onPress={onPress} className="active:opacity-95">
            <ImageBackground
                source={bg}
                resizeMode="cover"
                style={{
                    width: W,
                    height: 165,
                    borderRadius: 12,
                    overflow: "hidden",
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.18,
                    shadowRadius: 12,
                    elevation: 8,
                }}
                imageStyle={{ borderRadius: 12 }}
            >
                {/* soft overlay to keep text readable across all bgs */}
                <View
                    style={StyleSheet.absoluteFillObject}
                    className="bg-black/10"
                />
                <View className="px-6 ">
                    <Text className="text-white text-[14px] font-semibold text-center">
                        {title}
                    </Text>
                    <Text className="text-white/85 text-[11px] leading-4 text-center mt-2">
                        {desc}
                    </Text>
                </View>
            </ImageBackground>
        </Pressable>
    );
}
